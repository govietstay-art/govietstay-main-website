-- Flat 12% sales commission policy (effective for bookings created 2026-10-16 onwards).
-- Historical staff booking rates are preserved; legacy partner/PI terms remain auditable.
-- Always calculate on generated bookings.net_revenue_vnd (final gross minus discount), including custom.
CREATE OR REPLACE FUNCTION public.admin_recalculate_staff_compensation(p_month date DEFAULT CURRENT_DATE)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_start date:=date_trunc('month',coalesce(p_month,current_date))::date;
  v_end date:=(date_trunc('month',coalesce(p_month,current_date))+interval '1 month')::date;
  s record;
  v_month_tours bigint;
  v_rows integer;
  v_updated integer:=0;
begin
  if not public.is_govietstay_admin() then raise exception 'not authorized'; end if;

  for s in
    select id,coalesce(compensation_plan_code,'sales_pax_v1') as plan_code
    from public.staff_profiles
    where sales_code is not null
  loop
    select count(*)::bigint into v_month_tours
    from public.bookings b
    left join public.booking_financials f on f.booking_id=b.id
    left join public.staff_booking_commission_overrides o on o.booking_id=b.id
    where b.staff_id=s.id
      and b.tour_date>=v_start and b.tour_date<v_end
      and lower(coalesce(b.status,'')) in ('completed','closed')
      and (lower(coalesce(b.payment_status,''))='paid' or coalesce(f.amount_received_vnd,0)>=b.net_revenue_vnd)
      and coalesce(f.finance_finalized,false)=true
      and coalesce(o.commission_eligible,true)=true;

    insert into public.booking_financials(booking_id,staff_commission_vnd)
    select b.id,
      case
        when lower(coalesce(b.status,'')) not in ('completed','closed') then 0
        when not (lower(coalesce(b.payment_status,''))='paid' or coalesce(f.amount_received_vnd,0)>=b.net_revenue_vnd) then 0
        when coalesce(f.finance_finalized,false)=false then 0
        when coalesce(o.commission_eligible,true)=false then 0
        -- New bookings use a fixed 12% of real net selling revenue, even for custom quotes.
        -- Staff sales code wins when both staff and a QR partner are attached.
        when b.created_at >= timestamptz '2026-10-16 00:00:00+07'
          and b.partner_id is not null
          and upper(coalesce(b.ref_code,'')) <> upper(coalesce(
            (select sp2.sales_code from public.staff_profiles sp2 where sp2.id=b.staff_id),''
          )) then 0
        when b.created_at >= timestamptz '2026-10-16 00:00:00+07'
          then round(greatest(coalesce(b.net_revenue_vnd,0),0)::numeric * 0.12)::bigint
        when o.commission_amount_override_vnd is not null then o.commission_amount_override_vnd
        else coalesce(o.rate_per_pax_override_vnd,r.rate_per_pax_vnd,0) * coalesce(b.pax,b.adults+b.children,0)
      end
    from public.bookings b
    left join public.booking_financials f on f.booking_id=b.id
    left join public.staff_booking_commission_overrides o on o.booking_id=b.id
    left join public.tours t on t.id=b.tour_id
    left join lateral (
      select rr.rate_per_pax_vnd
      from public.staff_tour_commission_rates rr
      where rr.plan_code=s.plan_code
        and rr.active=true
        and rr.tour_slug=t.slug
        and rr.guide_language=coalesce(nullif(lower(b.guide_language),''),'en')
        and v_month_tours>=rr.min_monthly_pax
        and (rr.max_monthly_pax is null or v_month_tours<=rr.max_monthly_pax)
      order by rr.min_monthly_pax desc
      limit 1
    ) r on true
    where b.staff_id=s.id and b.tour_date>=v_start and b.tour_date<v_end
    on conflict(booking_id) do update
      set staff_commission_vnd=excluded.staff_commission_vnd,updated_at=now();

    get diagnostics v_rows=row_count;
    v_updated:=v_updated+v_rows;
  end loop;

  return jsonb_build_object('month_start',v_start,'updated_bookings',v_updated,'tier_basis','completed_tours');
end;
$function$


CREATE OR REPLACE FUNCTION public.admin_staff_payroll(p_month date DEFAULT CURRENT_DATE)
 RETURNS TABLE(staff_id uuid, display_name text, sales_code text, plan_code text, eligible_bookings bigint, pax bigint, revenue_vnd bigint, commissionable_profit_vnd bigint, base_salary_vnd bigint, commission_rate numeric, commission_vnd bigint, commission_adjustment_vnd bigint, bonus_vnd bigint, deduction_vnd bigint, advance_paid_vnd bigint, total_compensation_vnd bigint, payable_vnd bigint, override_notes text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_start date:=date_trunc('month',coalesce(p_month,current_date))::date;
  v_end date:=(date_trunc('month',coalesce(p_month,current_date))+interval '1 month')::date;
begin
  if not public.is_govietstay_admin() then raise exception 'not authorized'; end if;
  perform public.admin_recalculate_staff_compensation(v_start);

  return query
  with base as (
    select sp.id,sp.display_name,sp.sales_code,coalesce(sp.compensation_plan_code,'sales_pax_v1') plan_code,
      count(b.id) filter(where b.id is not null and lower(coalesce(b.status,'')) in ('completed','closed') and (lower(coalesce(b.payment_status,''))='paid' or coalesce(f.amount_received_vnd,0)>=b.net_revenue_vnd) and coalesce(f.finance_finalized,false)=true and coalesce(o.commission_eligible,true)=true)::bigint eligible_bookings,
      coalesce(sum(coalesce(b.pax,b.adults+b.children,0)) filter(where b.id is not null and lower(coalesce(b.status,'')) in ('completed','closed') and (lower(coalesce(b.payment_status,''))='paid' or coalesce(f.amount_received_vnd,0)>=b.net_revenue_vnd) and coalesce(f.finance_finalized,false)=true and coalesce(o.commission_eligible,true)=true),0)::bigint pax,
      coalesce(sum(b.net_revenue_vnd) filter(where b.id is not null and lower(coalesce(b.status,'')) in ('completed','closed') and (lower(coalesce(b.payment_status,''))='paid' or coalesce(f.amount_received_vnd,0)>=b.net_revenue_vnd) and coalesce(f.finance_finalized,false)=true and coalesce(o.commission_eligible,true)=true),0)::bigint revenue_vnd,
      coalesce(sum(greatest(b.net_revenue_vnd-coalesce(f.total_direct_cost_vnd,0),0)) filter(where b.id is not null and lower(coalesce(b.status,'')) in ('completed','closed') and (lower(coalesce(b.payment_status,''))='paid' or coalesce(f.amount_received_vnd,0)>=b.net_revenue_vnd) and coalesce(f.finance_finalized,false)=true and coalesce(o.commission_eligible,true)=true),0)::bigint commissionable_profit_vnd,
      coalesce(sum(f.staff_commission_vnd) filter(where b.id is not null),0)::bigint commission_vnd
    from public.staff_profiles sp
    left join public.bookings b on b.staff_id=sp.id and b.tour_date>=v_start and b.tour_date<v_end
    left join public.booking_financials f on f.booking_id=b.id
    left join public.staff_booking_commission_overrides o on o.booking_id=b.id
    where sp.sales_code is not null and sp.role='sales'
    group by sp.id,sp.display_name,sp.sales_code,sp.compensation_plan_code
  ), tiered as (
    select base.*,coalesce(t.base_salary_vnd,0)::bigint plan_base
    from base
    left join lateral (
      select *
      from public.staff_base_pax_tiers x
      where x.plan_code=base.plan_code
        and x.active=true
        and base.eligible_bookings>=x.min_monthly_pax
        and (x.max_monthly_pax is null or base.eligible_bookings<=x.max_monthly_pax)
      order by x.min_monthly_pax desc
      limit 1
    ) t on true
  )
  select t.id,t.display_name,t.sales_code,t.plan_code,t.eligible_bookings,t.pax,t.revenue_vnd,t.commissionable_profit_vnd,
    (case when v_start >= date '2026-10-01' then 0::bigint else coalesce(po.base_salary_override_vnd,t.plan_base) end)::bigint,
    (case when v_start >= date '2026-10-01' then 0.12 else 0 end)::numeric,
    t.commission_vnd,
    coalesce(po.commission_adjustment_vnd,0)::bigint,
    coalesce(po.bonus_vnd,0)::bigint,
    coalesce(po.deduction_vnd,0)::bigint,
    coalesce(po.advance_paid_vnd,0)::bigint,
    greatest((case when v_start >= date '2026-10-01' then 0::bigint else coalesce(po.base_salary_override_vnd,t.plan_base) end)+t.commission_vnd+coalesce(po.commission_adjustment_vnd,0)+coalesce(po.bonus_vnd,0)-coalesce(po.deduction_vnd,0),0)::bigint,
    greatest((case when v_start >= date '2026-10-01' then 0::bigint else coalesce(po.base_salary_override_vnd,t.plan_base) end)+t.commission_vnd+coalesce(po.commission_adjustment_vnd,0)+coalesce(po.bonus_vnd,0)-coalesce(po.deduction_vnd,0)-coalesce(po.advance_paid_vnd,0),0)::bigint,
    po.notes
  from tiered t
  left join public.staff_payroll_overrides po on po.staff_id=t.id and po.month_start=v_start
  order by t.display_name;
end;
$function$


CREATE OR REPLACE FUNCTION public.partner_monthly_compensation(p_partner_id uuid, p_month date DEFAULT CURRENT_DATE)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_start date := date_trunc('month',coalesce(p_month,current_date))::date;
  v_end date := (date_trunc('month',coalesce(p_month,current_date)) + interval '1 month')::date;
  v_total_pax bigint := 0;
  v_salary bigint := 0;
  v_commission bigint := 0;
  v_breakdown jsonb := '[]'::jsonb;
begin

  -- Standard partner referrals: same 12% of net selling price as staff.
  -- Pi Community has a separate reward model and follows its existing legacy path below.
  if coalesce((select lower(p.market) from public.partners p where p.id=p_partner_id),'') <> 'pi-community' then
    select coalesce(sum(coalesce(b.pax,b.adults+b.children,0)),0)::bigint into v_total_pax
    from public.bookings b
    where b.partner_id=p_partner_id
      and coalesce(b.tour_date,b.created_at::date)>=v_start
      and coalesce(b.tour_date,b.created_at::date)<v_end
      and lower(coalesce(b.status,''))<>'cancelled';

    with eligible as (
      select b.id,b.booking_code,
        coalesce(b.pax,b.adults+b.children,0)::bigint pax,
        greatest(coalesce(b.net_revenue_vnd,0),0)::bigint net_selling_vnd,
        coalesce(nullif(b.custom_tour_name,''),t.name,b.commission_tour_code,'Custom tour')::text tour_name,
        coalesce(b.guide_language,'')::text guide_language
      from public.bookings b
      left join public.tours t on t.id=b.tour_id
      left join public.booking_financials f on f.booking_id=b.id
      where b.partner_id=p_partner_id
        and b.created_at >= timestamptz '2026-10-16 00:00:00+07'
        and coalesce(b.tour_date,b.created_at::date)>=v_start
        and coalesce(b.tour_date,b.created_at::date)<v_end
        and lower(coalesce(b.status,'')) in ('completed','closed')
        and lower(coalesce(b.payment_status,'')) not in ('refunded','chargeback')
        and (lower(coalesce(b.payment_status,''))='paid'
          or coalesce(f.amount_received_vnd,0)>=b.net_revenue_vnd)
        and coalesce(f.finance_finalized,false)=true
        and coalesce(b.pax,b.adults+b.children,0)>0
        and b.net_revenue_vnd>0
        -- Never award both a staff seller and a QR partner on the same booking.
        and (b.staff_id is null or upper(coalesce(b.ref_code,''))<>
          upper(coalesce((select s.sales_code from public.staff_profiles s where s.id=b.staff_id),'')))
    )
    select
      coalesce(sum(round(e.net_selling_vnd::numeric*0.12)),0)::bigint,
      coalesce(jsonb_agg(jsonb_build_object(
        'booking_id',e.id,
        'booking_code',e.booking_code,
        'tour_name',e.tour_name,
        'guide_language',e.guide_language,
        'pax',e.pax,
        'net_selling_vnd',e.net_selling_vnd,
        'commission_rate',0.12,
        'commission_per_pax_vnd',round(e.net_selling_vnd::numeric*0.12/e.pax)::bigint,
        'commission_vnd',round(e.net_selling_vnd::numeric*0.12)::bigint
      ) order by e.tour_name,e.booking_code),'[]'::jsonb)
    into v_commission,v_breakdown
    from eligible e;

    return jsonb_build_object(
      'month_start',v_start,
      'month_pax',v_total_pax,
      'base_salary_vnd',0,
      'tour_commission_vnd',v_commission,
      'total_earning_vnd',v_commission,
      'commission_rate',0.12,
      'commission_breakdown',v_breakdown
    );
  end if;

  select coalesce(sum(coalesce(b.pax,b.adults+b.children,0)),0)::bigint
    into v_total_pax
  from public.bookings b
  where b.partner_id=p_partner_id
    and coalesce(b.status,'') <> 'cancelled'
    and coalesce(b.tour_date,b.created_at::date) >= v_start
    and coalesce(b.tour_date,b.created_at::date) < v_end;

  select coalesce(s.salary_vnd,0)
    into v_salary
  from public.partner_salary_tiers s
  where v_total_pax >= s.min_pax
    and (s.max_pax is null or v_total_pax <= s.max_pax)
  order by s.min_pax desc
  limit 1;

  with eligible as (
    select
      coalesce(b.pax,b.adults+b.children,0)::bigint as pax,
      coalesce(b.commission_tour_code,t.commission_tour_code,public.resolve_commission_tour_code(t.name)) as tour_code,
      b.guide_language,
      coalesce(t.name,b.commission_tour_code,'Unknown') as booking_tour_name
    from public.bookings b
    left join public.tours t on t.id=b.tour_id
    where b.partner_id=p_partner_id
      and coalesce(b.status,'') <> 'cancelled'
      and coalesce(b.tour_date,b.created_at::date) >= v_start
      and coalesce(b.tour_date,b.created_at::date) < v_end
  ), calc as (
    select
      e.tour_code,
      coalesce(m.tour_name,e.booking_tour_name) as tour_name,
      e.guide_language,
      sum(e.pax)::bigint as pax,
      max(m.commission_per_pax_vnd)::bigint as commission_per_pax_vnd,
      sum(e.pax * coalesce(m.commission_per_pax_vnd,0))::bigint as commission_vnd
    from eligible e
    left join public.partner_commission_matrix m
      on m.tour_code=e.tour_code
     and m.guide_language=e.guide_language
     and v_total_pax >= m.min_month_pax
     and (m.max_month_pax is null or v_total_pax <= m.max_month_pax)
    group by e.tour_code,coalesce(m.tour_name,e.booking_tour_name),e.guide_language
  )
  select
    coalesce(sum(commission_vnd),0)::bigint,
    coalesce(jsonb_agg(jsonb_build_object(
      'tour_code',tour_code,
      'tour_name',tour_name,
      'guide_language',guide_language,
      'pax',pax,
      'commission_per_pax_vnd',coalesce(commission_per_pax_vnd,0),
      'commission_vnd',commission_vnd
    ) order by tour_name,guide_language),'[]'::jsonb)
  into v_commission,v_breakdown
  from calc;

  return jsonb_build_object(
    'month_start',v_start,
    'month_pax',v_total_pax,
    'base_salary_vnd',coalesce(v_salary,0),
    'tour_commission_vnd',coalesce(v_commission,0),
    'total_earning_vnd',coalesce(v_salary,0)+coalesce(v_commission,0),
    'commission_breakdown',coalesce(v_breakdown,'[]'::jsonb)
  );
end;
$function$



-- New contract version: re-acceptance required before treating new terms as accepted.
UPDATE public.partner_terms_versions SET active=false WHERE active=true AND version<>'2.0';
INSERT INTO public.partner_terms_versions(version,language,title,content_sha256,effective_at,active)
VALUES ('2.0','ru','GoVietStay Partner Terms · 12% net sales',
  encode(digest($gvs_terms$
  ["1. Статус сотрудничества","Партнёр действует как независимый партнёр по привлечению клиентов и не является сотрудником или лицом, имеющим право создавать обязательства от имени GoVietStay, если иное не согласовано письменно."],
  ["2. Атрибуция клиентов","Клиент закрепляется за Партнёром, если первое подтверждаемое обращение зафиксировано через персональную ссылку, QR-код, партнёрский код либо вручную подтверждено GoVietStay до бронирования. Данные системы GoVietStay являются основной записью для расчёта."],
  ["3. Запрет обхода и «увода» клиента","После передачи клиента GoVietStay запрещено обходить систему, переводить клиента на прямую оплату себе или третьему лицу, перенаправлять его к конкуренту по тому же запросу, скрывать бронирование или искажать код атрибуции. При подтверждённом нарушении GoVietStay вправе приостановить доступ, исключить спорные операции из расчёта и требовать возмещения фактически причинённого ущерба в пределах закона."],
  ["4. Обязанности GoVietStay","GoVietStay консультирует переданных клиентов, подтверждает цену и доступность, организует бронирование, транспорт, гидов и согласованные услуги, ведёт учёт заказов и PAX и предоставляет статистику в кабинете."],
  ["5. Обязанности Партнёра","Партнёр использует только свой персональный код/ссылку/QR, предоставляет достоверную информацию, не вводит клиента в заблуждение, соблюдает законы и правила платформ и не выдаёт себя за сотрудника GoVietStay без письменного разрешения."],
  ["6. PAX","Один оплачиваемый пассажир/гость в подтверждённом бронировании = 1 PAX. Отменённые, возвращённые, тестовые, фиктивные, дублирующие или оспоренные бронирования могут быть исключены из расчёта."],
  ["7. Без базовой выплаты","В программе партнёрских продаж нет фиксированной базовой выплаты или месячных ступеней. Для новых бронирований действует единая комиссия 12% от фактической согласованной стоимости после скидок. Ранее подтверждённые выплаты не изменяются задним числом."],
  ["8. Комиссия 12%","За каждый соответствующий условиям оплаченный и завершённый заказ Партнёру начисляется 12% от окончательной стоимости продажи (включая индивидуальные/частные туры и custom price). Комиссия за заказ = 12% × общая стоимость продажи после скидок и корректировок; сумма не зависит от языка гида или количества PAX за месяц."],
  ["9. Выплаты","Вознаграждение начисляется только по завершённым и финансово действительным бронированиям. Возвраты, chargeback, отмены, ошибки, мошенничество и дубли могут корректироваться в текущем или следующем расчёте."],
  ["10. Конфиденциальность","Контакты клиентов, внутренние цены, операционные процессы, партнёрские условия, доступ к кабинету и иная непубличная информация являются конфиденциальными и не должны передаваться третьим лицам."],
  ["11. Бренд GoVietStay","Логотип и материалы GoVietStay можно использовать только для добросовестного продвижения в рамках сотрудничества. Нельзя создавать аккаунты, домены или рекламу, вводящие людей в заблуждение относительно собственности или официального представительства."],
  ["12. Проверка и приостановление","При разумном подозрении на мошенничество, обход системы, жалобы клиентов, нарушение закона или бренда GoVietStay вправе временно приостановить доступ и начисления на период проверки."],
  ["13. Прекращение сотрудничества","Каждая сторона может прекратить сотрудничество на будущее. GoVietStay вправе прекратить его немедленно при существенном нарушении, мошенничестве, обходе системы, злоупотреблении данными клиентов или незаконной деятельности."],
  ["14. Ограничение полномочий","Партнёр не вправе принимать деньги от имени GoVietStay, заключать договоры, давать гарантии или создавать обязательства для GoVietStay без отдельного письменного разрешения."],
  ["15. Споры","Стороны сначала пытаются урегулировать спор переговорами и сверкой данных системы. Для повышенной юридической определённости рекомендуется отдельный двуязычный договор с полными реквизитами сторон."],
  ["16. Электронное согласие","Нажатие кнопки принятия условий, ввод имени и продолжение использования партнёрского кабинета после отображения условий фиксируются системой как электронное подтверждение ознакомления и согласия с указанной версией условий в пределах, допускаемых применимым законодательством."]$gvs_terms$,'sha256'),'hex'),
  timestamptz '2026-10-16 00:00:00+07',true)
ON CONFLICT(version) DO UPDATE SET
  content_sha256=excluded.content_sha256,language=excluded.language,
  title=excluded.title,effective_at=excluded.effective_at,active=true;

