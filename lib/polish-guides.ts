export type PolishGuide = {
  slug: "phu-quoc-przewodnik" | "phu-quoc-wycieczki-prywatne" | "danang-hoi-an-hue";
  title: string; metaTitle: string; description: string; kicker: string; lead: string;
  hero: string; heroAlt: string; keywords: string[];
  quick: {label: string; value: string}[];
  sections: { id: string; overline: string; heading: string; paragraphs: string[]; bullets?: string[]; tip?: string; image?: string; imageAlt?: string }[];
  itineraries: {name: string; intro: string; days: {day: string; plan: string}[]; caution?: string}[];
  faq: {q:string; a:string}[];
  gallery: {src: string; alt: string}[];
  related: {href:string; title:string; description:string}[];
  references: {url:string; label:string}[];
  whatsapp: string; leadProduct: string;
};

export const polishGuides: PolishGuide[] = [
  {
    slug: "phu-quoc-przewodnik",
    title: "Phu Quoc na własną rękę: przewodnik na sezon 2026/2027",
    metaTitle: "Phu Quoc 2026/2027 – kiedy jechać, gdzie spać, co zobaczyć",
    description: "Praktyczny przewodnik po Phu Quoc dla turystów z Polski: pogoda, plaże, wybór hotelu, transport, wiza do Wietnamu, wycieczki, koszty i gotowe plany na 7–14 dni.",
    kicker: "PHU QUOC · WIETNAM DLA PODRÓŻUJĄCYCH Z POLSKI",
    lead: "Zamiast listy „30 atrakcji, które musisz zobaczyć” dostajesz tu odpowiedzi na ważniejsze pytania: na której części wyspy nocować, kiedy morze jest spokojniejsze, ile dni przeznaczyć na zwiedzanie i czego nie rezerwować w ciemno.",
    hero: "/tour/phuquoc/tour-01-1.jpg",
    heroAlt: "Tropikalny krajobraz wyspy Phu Quoc w Wietnamie",
    keywords: ["Phu Quoc 2026", "Phu Quoc 2027", "Phu Quoc na własną rękę", "Phu Quoc co zobaczyć", "Phu Quoc kiedy jechać", "Phu Quoc wiza Polacy", "Phu Quoc gdzie nocować", "Phu Quoc wycieczki"],
    quick: [
      {label:"Najlepszy okres na plażowanie", value:"Zwykle grudzień–marzec; sprawdź prognozę dla konkretnych dni."},
      {label:"Na ile dni", value:"7–10 dni na odpoczynek z wycieczkami; 14 dni, jeśli lubisz spokojniejsze tempo."},
      {label:"Główne lotnisko", value:"Phu Quoc International Airport (PQC)."},
      {label:"Na miejscu", value:"Wietnamski dong (VND), płatności kartą i gotówką zależnie od miejsca."}
    ],
    sections: [
      {
        id:"pogoda", overline:"01 · KIEDY LECIEĆ", heading:"Phu Quoc w listopadzie, grudniu, styczniu czy marcu?",
        paragraphs:[
          "Phu Quoc leży w Zatoce Tajlandzkiej. Klimat wyspy różni się od klimatu środkowego Wietnamu. Okres od listopada do kwietnia to zazwyczaj korzystniejszy czas na plażowanie, a grudzień, styczeń i luty są popularne dzięki niższemu ryzyku intensywnych deszczów. Pogoda nie jest jednak gwarantowana nawet w sezonie.",
          "Od maja do października opady bywają częstsze, a wzburzone morze może utrudniać rejsy i snorkeling. Jeśli planujesz wycieczki łodzią, zostaw jeden dzień rezerwowy i potwierdzaj warunki na morzu z lokalnym operatorem."
        ],
        bullets:[
          "Listopad: okres przejściowy; mogą zdarzać się deszcze, ale pogoda często się poprawia.",
          "Grudzień–marzec: zwykle najlepszy kompromis na plaże i rejsy, choć terminy świąteczne bywają zatłoczone.",
          "Kwiecień: gorąco; nadal może być przyjemnie, ale trzeba uważać na słońce.",
          "Maj–październik: większa zmienność i ryzyko odwołania atrakcji na morzu."
        ],
        tip:"Nie kieruj się prognozą z Da Nang przy planowaniu wycieczki na Phu Quoc. To dwa różne regiony pogodowe."
      },
      {
        id:"regiony", overline:"02 · GDZIE NOCOWAĆ", heading:"Long Beach, Ong Lang, Grand World czy Sunset Town? Każde miejsce jest inne",
        paragraphs:[
          "Long Beach (Bai Truong) to rozsądna baza na pierwszy pobyt: dojazd z lotniska, wiele hoteli i restauracji oraz zachody słońca nad zachodnim wybrzeżem. Warto jednak sprawdzić położenie konkretnego obiektu — długa plaża nie oznacza, że do wszystkich miejsc dotrzesz pieszo.",
          "Ong Lang sprawdzi się osobom szukającym spokojniejszej atmosfery. Grand World na północy ma wieczorne iluminacje i rozrywkę, ale jest daleko od południowych atrakcji. Sunset Town na południu przyciąga architekturą, kolejką na Hon Thom i pokazami; nie każdy apartament leży przy dobrej plaży do kąpieli."
        ],
        bullets:[
          "Rodzina z małymi dziećmi: porównaj dostęp do plaży, basen, cień i odległość od restauracji.",
          "Para: wybierz spokojną okolicę, jeśli bardziej cenisz plażę niż duże widowiska.",
          "Osoby aktywne: sprawdź odległość do portu An Thoi i północnej części wyspy.",
          "Nie kieruj się samą nazwą dzielnicy — na mapie sprawdź rzeczywistą lokalizację hotelu."
        ],
        tip:"GoVietStay może pomóc porównać lokalizacje; dostępność i cenę konkretnych pokoi zawsze trzeba potwierdzić na daty podróży."
      },
      {
        id:"przeloty", overline:"03 · LOTY I TRANSFER", heading:"Jak dostać się na Phu Quoc z Polski i co zrobić po przylocie",
        paragraphs:[
          "Loty czarterowe i rejsowe z Polski mogą zmieniać się między sezonami. Sprawdzaj bezpośrednio u organizatora podróży lub linii lotniczej, czy Twój przelot jest bezpośredni, czy obejmuje przesiadkę. Na wyspę latają również samoloty z innych miast Wietnamu, m.in. Ho Chi Minh i Hanoi.",
          "Po przylocie przygotuj nazwę hotelu, adres, numer lotu i informację o liczbie bagaży. Rodzinom z wózkiem, grupom i osobom przylatującym późno wygodniej może być uzgodnić odbiór z góry. Nie trzeba kupować pełnego pakietu wycieczek, aby zamówić sam transfer."
        ],
        bullets:[
          "Wjazd: sprawdź warunki dla polskiego paszportu i dalszego tranzytu przed zakupem biletu.",
          "Transfer: potwierdź wielkość auta i liczbę walizek, szczególnie przy 4–6 osobach.",
          "Internet: karta SIM/eSIM przyda się do map, komunikatorów i płatności.",
          "Godzina przyjazdu: po kontroli paszportowej i odbiorze bagażu zostaw zapas czasu."
        ]
      },
      {
        id:"wiza", overline:"04 · WIZA DLA POLAKÓW", heading:"Czy obywatele Polski potrzebują wizy do Wietnamu w 2026 i 2027 roku?",
        paragraphs:[
          "Według rezolucji 229/NQ-CP obywatele Polski podróżujący turystycznie mogą korzystać ze zwolnienia z wizy na pobyt do 45 dni, pod warunkiem spełnienia wymogów wjazdowych. Ten program jest przewidziany na okres od 15 sierpnia 2025 do 14 sierpnia 2028 roku. Nie jest to to samo co starszy, ograniczony program z początku 2025 roku.",
          "Paszport powinien być ważny co najmniej sześć miesięcy. Jeśli planujesz pobyt dłuższy niż 45 dni, pracę albo podróż o innym charakterze, sprawdź odpowiednią wizę w oficjalnych źródłach. Nie polegaj na wpisach w mediach społecznościowych, które mogą opisywać nieaktualne zasady."
        ],
        bullets:[
          "Przy podróży turystycznej do 45 dni: sprawdź aktualny zakres zwolnienia oraz wymagania przewoźnika.",
          "Oficjalny komunikat w języku polskim: gov.pl/web/wietnam.",
          "Dłuższy pobyt: rządowy portal e-wiz evisa.gov.vn.",
          "Gdy łączysz kilka krajów, osobno sprawdź zasady przesiadek i ponownego wjazdu."
        ],
        tip:"Wpis jest informacyjny, nie stanowi gwarancji wpuszczenia na granicy. Warto ponownie sprawdzić zasady tuż przed wylotem."
      },
      {
        id:"plaze", overline:"05 · PLAŻE", heading:"Gdzie odpocząć nad morzem, a gdzie jechać tylko na spacer?",
        paragraphs:[
          "Bai Sao kojarzy się z jasnym piaskiem i turkusową wodą, ale warunki i czystość zmieniają się zależnie od pogody oraz miejsca. Long Beach jest atrakcyjna na zachody słońca i łatwa do połączenia z pobytem w hotelu. Ong Lang oferuje spokojniejsze fragmenty wybrzeża, natomiast północ wyspy bywa bardziej oddalona od głównych atrakcji.",
          "Przy wyborze plaży ważniejsze od zdjęć w internecie są aktualne fale, prądy i zalecenia ratowników. Przy silnym wietrze nie warto wchodzić do wody ani próbować rejsu tylko dlatego, że wcześniej kupiło się wycieczkę."
        ],
        bullets:["Bai Sao: sprawdź dojazd i aktualny stan plaży.", "Long Beach: zachód słońca i restauracje w pobliżu.", "Ong Lang: wybór dla osób szukających ciszy.", "Nie wszystkie odcinki plaż są publicznie dostępne przez teren resortów."]
      },
      {
        id:"atrakcje", overline:"06 · CO ZOBACZYĆ", heading:"Najciekawsze miejsca — bez biegania od atrakcji do atrakcji",
        paragraphs:[
          "Na południu warto rozważyć kolejkę linową z An Thoi na Hon Thom, wyspy archipelagu An Thoi i wieczorny spacer po Sunset Town. Na północy popularne są Grand World oraz parki rozrywki; ich ofertę najlepiej sprawdzić dla wieku dzieci i zainteresowań całej grupy.",
          "Jeżeli chcesz poznać codzienne życie, wybierz targ w Duong Dong, lokalne jedzenie, tradycję produkcji sosu rybnego i uprawę pieprzu. Każda z tych aktywności daje inny obraz wyspy niż resort czy park rozrywki."
        ],
        bullets:["Kolejka na Hon Thom: sprawdź godziny i zakres biletu.", "Rejs po wyspach: wybierz pogodę i typ łodzi, a nie tylko liczbę przystanków.", "Grand World: warto z góry uwzględnić dłuższy dojazd z południa.", "Targ nocny: dobry na jedzenie i spacer; ceny sprawdzaj przed zamówieniem."],
        image:"/tour/phuquoc/johns/cable-car-trip.jpg", imageAlt:"Kolejka linowa na wyspę Hon Thom"
      },
      {
        id:"rejsy", overline:"07 · WYCIECZKI MORSKIE", heading:"Trzy wyspy, cztery wyspy, snorkeling — czym różnią się oferty?",
        paragraphs:[
          "Nazwy „3 islands” i „4 islands” nie są jednolitym produktem. Różnice mogą dotyczyć portu wypłynięcia, długości pobytu w wodzie, lunchu, rodzaju łodzi, sprzętu, ubezpieczenia, liczby uczestników i obecności przewodnika. Ta sama liczba wysp nie oznacza identycznego programu.",
          "Dla rodzin z dziećmi najważniejsze są kamizelki, osłona przed słońcem, toaleta na łodzi i realny czas spędzony w wodzie. Dla par prywatna łódź może dawać więcej swobody, ale nie każda ma warunki do dalekomorskiego wędkowania."
        ],
        bullets:["Sprawdź, czy oferta jest grupowa czy prywatna.", "Zapytaj, czy odbiór z hotelu, lunch i sprzęt są wliczone.", "Wiek i wzrost dziecka mogą wpływać na cenę atrakcji.", "Trasa zależy od pogody i może się zmienić tego samego dnia."],
        tip:"Na osobnej stronie wyjaśniamy dokładnie, kiedy wybrać rejs prywatny, a kiedy wspólny."
      },
      {
        id:"budzet", overline:"08 · ILE TO KOSZTUJE", heading:"Jak oszacować budżet bez mylących cen „od”",
        paragraphs:[
          "Budżet podziel na cztery części: nocleg, wyżywienie, transport oraz atrakcje. Cena jednej wycieczki nie mówi wiele, dopóki nie wiadomo, czy obejmuje bilety, transfer, posiłek, język opiekuna, prywatną łódź i ewentualne dopłaty za odległy hotel.",
          "Płać w wietnamskich dongach lub w walucie uzgodnionej z operatorem. Kurs PLN/VND i opłaty bankowe zmieniają się. Kartą można płacić w wielu hotelach i restauracjach, ale na mniejszych stoiskach i targach przyda się gotówka."
        ],
        bullets:["Porównuj zakres usług, nie tylko najniższą kwotę.", "Zadbaj o potwierdzenie zasad anulacji przed płatnością.", "Zgłoś liczbę dorosłych i wiek dzieci — wpływa to na wycenę.", "Nie wysyłaj zaliczek na niezweryfikowane konto."],
        tip:"GoVietStay potwierdza końcową cenę, dostępność i wliczone świadczenia przed rezerwacją."
      },
      {
        id:"rodzina", overline:"09 · RODZINY", heading:"Phu Quoc z dziećmi i seniorami: jak uniknąć zmęczenia",
        paragraphs:[
          "Najlepszy plan dla rodziny nie musi zawierać atrakcji każdego dnia. Zostaw co najmniej kilka swobodnych poranków przy basenie lub plaży. Jeśli podróżują dziadkowie, ważniejsze od liczby odwiedzanych wysp będą cień, wygodny transport i łatwo dostępne toalety.",
          "Przy podróży z małymi dziećmi zapytaj o fotelik samochodowy i warunki bezpieczeństwa łodzi. Nie planuj długiego rejsu w dzień przylotu ani przejazdu przez całą wyspę tuż przed późnym lotem."
        ],
        bullets:["Ustal rytm zwiedzania wokół drzemek i posiłków dzieci.", "Przy wrażliwości na kołysanie łodzi porównaj spokojniejsze alternatywy lądowe.", "Dla osób starszych sprawdź schody, długie spacery i dostęp do klimatyzacji."]
      },
      {
        id:"polaczenie", overline:"10 · DALEJ PO WIETNAMIE", heading:"Czy łączyć Phu Quoc z Da Nang, Hoi An i Hue?",
        paragraphs:[
          "Tak, ale nie traktuj Wietnamu jak małej wyspy. Phu Quoc leży na południu, a Da Nang i Hoi An w części środkowej. Połączenie zwykle wymaga przelotu i może zająć niemal cały dzień, kiedy uwzględnisz dojazdy, odprawę i transfer z nowego lotniska.",
          "Od grudnia do lutego Phu Quoc jest często pogodowo łatwiejsze na wypoczynek nad morzem niż środkowy Wietnam. Z kolei na zwiedzanie Da Nang, Hoi An i Hue dobrym terminem bywa wiosna. Jeśli twoim priorytetem jest słońce, dobieraj regiony do pory roku, a nie odwrotnie."
        ],
        bullets:["Przy 7 dniach: lepiej skupić się na jednym regionie.", "Przy 10–14 dniach: można rozważyć łączenie regionów, ale zostaw bufor na transport.", "Zimowe wakacje: Phu Quoc na plażowanie, środkowy Wietnam z elastycznym planem zwiedzania."]
      },
      {
        id:"praktyczne", overline:"11 · PRAKTYCZNE", heading:"Pieniądze, internet, bezpieczeństwo i kontakt z lokalnym zespołem",
        paragraphs:[
          "Zapisz adres hotelu offline, sprawdź limit bagażu na lot wewnętrzny i zabezpiecz dokumenty. Na wyspie słońce potrafi być intensywne nawet przy lekkim zachmurzeniu, dlatego warto pić wodę i stosować ochronę przeciwsłoneczną.",
          "GoVietStay działa lokalnie w Wietnamie. Możesz zamówić wyłącznie transfer, sam bilet albo pojedynczą wycieczkę bez wykupywania dodatkowego pakietu pobytowego. Kontakt i organizacja zwykle odbywają się po angielsku lub rosyjsku; obsługa po polsku nie jest obecnie gwarantowana."
        ],
        bullets:["WhatsApp: +84 937 762 607.", "Podaj daty, hotel i liczbę osób, zanim poprosisz o konkretną wycenę.", "Bez potwierdzenia dostępności nie należy traktować wysłanego zapytania jako rezerwacji."]
      }
    ],
    itineraries: [
      {
        name:"7 dni: odpoczynek i najważniejsze miejsca",
        intro:"Plan dla osób, które nie chcą spędzić całego urlopu w aucie.",
        days:[
          {day:"Dzień 1",plan:"Przylot, transfer do hotelu, spokojny wieczór."},
          {day:"Dzień 2",plan:"Plaża i okolice hotelu; zachód słońca nad zachodnim wybrzeżem."},
          {day:"Dzień 3",plan:"Południe wyspy: Sunset Town i kolejka na Hon Thom."},
          {day:"Dzień 4",plan:"Odpoczynek lub krótka wycieczka lokalna."},
          {day:"Dzień 5",plan:"Rejs po wyspach przy dobrej pogodzie albo alternatywa lądowa."},
          {day:"Dzień 6",plan:"Grand World lub targ i lokalne jedzenie; nie wciskaj wszystkiego naraz."},
          {day:"Dzień 7",plan:"Czas na pakowanie, transfer na lotnisko."}
        ],
        caution:"Kolejność dni zależy od pogody. Rejsu nie planuj jako ostatniej obowiązkowej atrakcji bez planu B."
      },
      {
        name:"14 dni: wolniejsza podróż",
        intro:"Dla rodzin, par i osób, które chcą naprawdę odpocząć.",
        days:[
          {day:"Dni 1–3",plan:"Przylot, plażowanie, poznanie okolicy i lokalnych restauracji."},
          {day:"Dni 4–5",plan:"Południe wyspy, Hon Thom i dzień bez zaplanowanych atrakcji."},
          {day:"Dni 6–7",plan:"Łódź i snorkeling w spokojny dzień; regeneracja następnego dnia."},
          {day:"Dni 8–10",plan:"Północna część wyspy, Grand World i spokojniejsze miejsca."},
          {day:"Dni 11–13",plan:"Ulubiona plaża, dodatkowy wyjazd lub czas rodzinny."},
          {day:"Dzień 14",plan:"Powrót na lotnisko."}
        ],
        caution:"Przy 14 dniach możesz też rozważyć przelot do Da Nang, ale nie jest to konieczne, by wyjazd był udany."
      }
    ],
    faq:[
      {q:"Czy Polacy potrzebują wizy na Phu Quoc?",a:"Na podróż turystyczną do 45 dni obowiązuje obecnie zwolnienie wizowe dla obywateli Polski, przy spełnieniu warunków wjazdu. Zasady sprawdź przed odlotem na gov.pl i oficjalnych stronach Wietnamu."},
      {q:"Czy na Phu Quoc jest pogoda w styczniu i lutym?",a:"Zazwyczaj to dobre miesiące na plażowanie i wycieczki morskie. Nie oznacza to gwarantowanego słońca każdego dnia."},
      {q:"Gdzie najlepiej nocować przy pierwszym pobycie?",a:"Long Beach sprawdza się jako punkt startowy. Sunset Town jest wygodny dla atrakcji południa, a Grand World dla północy — ale odległości na wyspie są duże."},
      {q:"Czy warto kupić wszystkie wycieczki przed przylotem?",a:"W szczycie sezonu warto pytać o dostępność wcześniej, ale rejsy należy potwierdzać z uwzględnieniem prognozy morza i warunków anulacji."},
      {q:"Czy można zamówić tylko transfer z lotniska?",a:"Tak. GoVietStay oferuje także pojedyncze usługi, bez obowiązku kupowania pełnego pakietu."},
      {q:"Czy prywatna łódź to to samo co prywatny samochód?",a:"Nie. Prywatny transport drogowy i prywatna łódź są osobno organizowanymi usługami. Zapytaj o konkretny rodzaj łodzi i program."},
      {q:"Czy mogę płacić w złotówkach?",a:"Ceny usług są zwykle potwierdzane w VND lub innej uzgodnionej walucie; nie zakładaj możliwości płatności gotówką w PLN na miejscu."},
      {q:"Czy GoVietStay ma przewodników mówiących po polsku?",a:"Nie gwarantujemy obsługi w języku polskim. Pracujemy głównie po angielsku i rosyjsku; inne języki wyłącznie po potwierdzeniu dostępności."}
    ],
    gallery:[
      {src:"/tour/phuquoc/johns/cable-car-trip.jpg",alt:"Kolejka linowa na Hon Thom"},
      {src:"/tour/phuquoc/johns/trip3-snorkeling.jpg",alt:"Snorkeling podczas wycieczki po wyspach"},
      {src:"/tour/phuquoc/johns/trip3-may-rut-trong.jpg",alt:"Widoki archipelagu An Thoi"}
    ],
    related:[
      {href:"/pl/phu-quoc-wycieczki-prywatne",title:"Wycieczki prywatne i rejsy na Phu Quoc",description:"Jak wybrać łódź, snorkeling i wycieczkę rodzinną."},
      {href:"/pl/danang-hoi-an-hue",title:"Da Nang, Hoi An i Hue",description:"Przewodnik po centralnym Wietnamie i gotowe trasy."},
      {href:"/ru/tours/phu-quoc",title:"Oferta wycieczek po rosyjsku",description:"Zobacz istniejące programy i sprawdź aktualną cenę."}
    ],
    references:[
      {url:"https://www.gov.pl/web/wietnam/zwolnienie-z-obowiazku-posiadania-wizy-dla-pobytow-w-celach-turystycznych-nie-dluzszych-niz-45-dni",label:"Gov.pl – zwolnienie wizowe dla obywateli Polski"},
      {url:"https://vietnam.travel/things-to-do/new-visa-exemption-policies-effective-15-august-2025",label:"Vietnam Tourism – zasady programu 2025–2028"},
      {url:"https://www.vietnam.travel/places-to-go/southern-vietnam/phu-quoc",label:"Vietnam Tourism – informacje o wyspie Phu Quoc"}
    ],
    whatsapp:"Hello GoVietStay, I am traveling from Poland to Phu Quoc. Travel dates: ____. Adults/children: ____. Hotel: ____. I would like advice on transfers and private experiences.",
    leadProduct:"Planowanie podróży na Phu Quoc"
  },
  {
    slug:"phu-quoc-wycieczki-prywatne",
    title:"Prywatne wycieczki na Phu Quoc: łódź, wyspy i podróż w swoim tempie",
    metaTitle:"Phu Quoc – prywatne wycieczki, 3–4 wyspy, snorkeling i Hon Thom",
    description:"Jak wybrać prywatne wycieczki na Phu Quoc: 3 lub 4 wyspy, łódź, snorkeling, Hon Thom, wycieczki rodzinne i ceny. Co obejmuje oferta i o co zapytać przed rezerwacją.",
    kicker:"PHU QUOC · PRYWATNIE · BEZ PAKIETU OBOWIĄZKOWYCH WYCIECZEK",
    lead:"Wycieczka prywatna ma sens wtedy, gdy daje coś więcej niż osobny rachunek: możliwość dopasowania tempa, godzin i atrakcji. Tłumaczymy, co realnie da się zmienić, za co się płaci i kiedy wyjazd grupowy będzie po prostu rozsądniejszy.",
    hero:"/tour/phuquoc/johns/luxury-speedboat.jpg",
    heroAlt:"Prywatna motorówka podczas wycieczki morskiej na Phu Quoc",
    keywords:["Phu Quoc wycieczki prywatne","Phu Quoc 3 wyspy","Phu Quoc 4 wyspy","Phu Quoc rejs prywatny","Phu Quoc snorkeling","Hon Thom bilety","Phu Quoc rodzinne wycieczki"],
    quick:[
      {label:"Dla kogo",value:"Rodziny, pary i małe grupy ceniące swobodny rytm."},
      {label:"Opcje",value:"Motorówka, wyspy An Thoi, snorkeling, zwiedzanie lądem."},
      {label:"Czas trwania",value:"Od kilku godzin do całego dnia – zależnie od programu."},
      {label:"Cena",value:"Wycena na konkretną datę, liczbę osób i zakres świadczeń."}
    ],
    sections:[
      {
        id:"prywatnie-czy-grupowo",overline:"01 · NAJPIERW WYBÓR",heading:"Wycieczka prywatna czy grupowa? To nie jest konkurs na najdroższy pakiet",
        paragraphs:[
          "Wycieczka grupowa ma zwykle stałe godziny i punkt zbiórki, dzięki czemu koszt na osobę bywa niższy. Jest dobrym rozwiązaniem, jeśli chcesz zobaczyć popularne wyspy, nie potrzebujesz indywidualnej opieki i akceptujesz tempo innych podróżnych.",
          "Wycieczka prywatna daje większy wpływ na plan, godziny i przerwy, szczególnie dla rodziny z dziećmi lub grupy znajomych. Nie daje jednak pełnej kontroli nad pogodą, dostępem do portów i obszarami chronionymi — operator nadal musi przestrzegać zasad bezpieczeństwa."
        ],
        bullets:["Grupowa: rozsądna cenowo, ale z ustalonym harmonogramem.", "Prywatna: wygodna przy własnym rytmie i większej liczbie osób.", "Prywatny samochód nie oznacza automatycznie prywatnej łodzi.", "Język przewodnika, posiłki i bilety trzeba potwierdzić osobno."]
      },
      {
        id:"trzy-cztery",overline:"02 · 3 VS 4 WYSPY",heading:"3 wyspy czy 4 wyspy? Zwróć uwagę na czas w wodzie, nie na liczbę w nazwie",
        paragraphs:[
          "Na południu Phu Quoc wiele rejsów prowadzi po archipelagu An Thoi. Popularne nazwy ofert „3 islands” i „4 islands” bywają marketingowym skrótem. Przy ocenie programu sprawdź konkretne przystanki, czas snorkelingu, rodzaj łodzi, czy można zejść na plażę i ile trwa transfer do portu.",
          "Niektóre pakiety łączą rejs z kolejką na Hon Thom. Inne skupiają się na snorkelowaniu lub sesjach zdjęciowych. Jedna dłuższa przerwa na wodzie może być przyjemniejsza niż cztery pośpieszne zatrzymania."
        ],
        bullets:["Poproś o nazwy planowanych punktów i informację, które mogą zmienić się z powodu fal.", "Sprawdź, czy posiłek serwowany jest na wyspie, czy na łodzi.", "Zapytaj o czas przepłynięcia i warunki na pokładzie.", "Jeśli chcesz głównie snorkelingu, unikaj programu nastawionego przede wszystkim na zdjęcia."]
      },
      {
        id:"lodzie",overline:"03 · RODZAJ ŁODZI",heading:"Motorówka, drewniana łódź, duży statek — jak wybrać?",
        paragraphs:[
          "Motorówka pomaga szybciej przemieszczać się między wyspami i jest częstą opcją przy krótszych wycieczkach. Większa łódź może zapewniać więcej miejsca, cień i spokojniejszy sposób spędzania czasu, choć wszystko zależy od konkretnej jednostki i pogody.",
          "Jeśli celem jest prawdziwe wędkowanie, nie zakładaj, że każda wycieczka „fishing” obejmuje wyjście daleko od brzegu i profesjonalny sprzęt. Proste próby łowienia ryb blisko lądu oraz wyprawy wędkarskie to różne produkty."
        ],
        bullets:["Przed wpłatą zapytaj o zdjęcie rzeczywistego rodzaju łodzi, maksymalną liczbę osób i kamizelki.", "Ustal, czy na pokładzie jest cień, toaleta oraz miejsce dla dzieci.", "Poproś o jasne zasady odwołania wyjazdu przy złym stanie morza."]
      },
      {
        id:"hon-thom",overline:"04 · KOLEJKA NA HON THOM",heading:"Czy warto połączyć rejs z kolejką linową?",
        paragraphs:[
          "Kolejka linowa z An Thoi na Hon Thom należy do najbardziej rozpoznawalnych atrakcji południa wyspy. Sam przejazd nad wodą jest atrakcją, a na Hon Thom funkcjonują także kompleksy rozrywki. Można połączyć je z rejsem, ale taki dzień będzie intensywny.",
          "Sprawdź, czy cena obejmuje bilet na kolejkę, dostęp do parku wodnego, przejazdy i lunch. Godziny pracy oraz atrakcje czasowo wyłączone z użytkowania mogą się zmieniać. Rodzinie z dziećmi lepiej czasem poświęcić cały dzień tylko temu miejscu."
        ],
        bullets:["Początek przejazdu: rejon An Thoi / Sunset Town.", "Bilety i godziny: sprawdź bezpośrednio u operatora przed wyjazdem.", "W programie łączonym ustal, ile czasu realnie zostanie na plażę lub snorkeling."],
        image:"/tour/phuquoc/johns/cable-car-trip.jpg",imageAlt:"Widok z kolejki linowej Hon Thom"
      },
      {
        id:"snorkeling",overline:"05 · WODA I BEZPIECZEŃSTWO",heading:"Snorkeling z dziećmi, dla początkujących i osób nieumiejących pływać",
        paragraphs:[
          "Snorkeling wymaga podstawowego komfortu w wodzie i odpowiedniej opieki. Osobom nieumiejącym pływać nie należy obiecywać takiej samej aktywności jak doświadczonym uczestnikom. Trzeba indywidualnie uzgodnić warunki, kamizelkę, nadzór i ewentualną rezygnację z wejścia do wody.",
          "Widoczność pod wodą zmienia się zależnie od prądów, fal i opadów. Żaden operator nie powinien gwarantować spotkania konkretnych zwierząt czy idealnej przejrzystości wody. Wybieraj bezpieczeństwo, nie obietnice na zdjęciach."
        ],
        bullets:["Dla dzieci podaj dokładny wiek i doświadczenie w wodzie.", "Unikaj dotykania koralowców i karmienia ryb.", "Zadbaj o ochronę przeciwsłoneczną zgodną z lokalnymi zaleceniami.", "Przy silnym wietrze poproś o zmianę daty albo bezpieczny wariant lądowy."]
      },
      {
        id:"rodziny",overline:"06 · RODZINA I PARA",heading:"Jak ułożyć wycieczkę pod rodzinę albo spokojny dzień we dwoje",
        paragraphs:[
          "Z małymi dziećmi krótsza wycieczka ze stałym miejscem odpoczynku bywa lepsza niż wielogodzinny rejs. Przy starszych osobach zwróć uwagę na wejście do łodzi, kołysanie, temperaturę i czas siedzenia w słońcu.",
          "Para może woleć prywatny rejs o spokojniejszej porze lub prywatny samochód z kierowcą i kilka lokalnych punktów. Nie trzeba kupować „pakietu luksusowego”, by dopasować dzień do własnych potrzeb."
        ],
        bullets:["Zaproponuj listę „chcemy koniecznie” i „fajnie, jeśli się uda”.", "Zapytaj o odbiór bezpośrednio z hotelu i dopłaty za odległą lokalizację.", "Przy rocznicach i specjalnych okazjach uzgodnij szczegóły, nie zakładaj automatycznych dodatków."]
      },
      {
        id:"cena",overline:"07 · PRZEJRZYSTA WYCENA",heading:"Z czego składa się cena prywatnej wycieczki?",
        paragraphs:[
          "Cena zależy od rodzaju pojazdu lub łodzi, wielkości grupy, dnia, sezonu, długości trasy i tego, co rzeczywiście jest wliczone. Warto porównać wyceny dla 2, 4 i 6 osób, bo koszt prywatnego transportu rozkłada się inaczej niż w grupie.",
          "GoVietStay ma na Phu Quoc różne programy i dostawców. Dwie podobne trasy mogą mieć odmienny zakres i cenę; nie łączymy ich sztucznie w jedną „najniższą” kwotę. Ostateczna oferta musi jasno opisywać konkretny wariant."
        ],
        bullets:["Potwierdź: typ łodzi, liczba osób i maksymalny czas trwania.", "Potwierdź: odbiór, bilety, jedzenie, napoje, sprzęt i ewentualne podatki.", "Potwierdź: dzieci, język wsparcia, warunki anulacji i opóźnienia.", "Nie wysyłaj danych karty przez zwykłą wiadomość."]
      },
      {
        id:"rezerwacja",overline:"08 · REZERWACJA",heading:"Jak wysłać jedno zapytanie, na które da się szybko odpowiedzieć?",
        paragraphs:[
          "Najbardziej użyteczne informacje to: daty pobytu, liczba osób dorosłych, wiek dzieci, nazwa hotelu, preferowany typ wycieczki oraz to, czy zależy ci na własnej łodzi czy wystarczy dojazd prywatnym autem. Jeśli jedna osoba ma ograniczenia ruchowe albo potrzebuje specjalnej diety, napisz o tym od razu.",
          "Po sprawdzeniu dostępności otrzymasz propozycję. Samo wysłanie formularza nie jest opłaconą rezerwacją. Na miejscu zespół pomaga przede wszystkim po angielsku i rosyjsku; polskojęzyczny przewodnik wymaga osobnego potwierdzenia."
        ],
        bullets:["Podaj przynajmniej dwa możliwe dni, jeśli rejs zależy od pogody.", "Wyjaśnij, czy priorytetem są zdjęcia, snorkeling, wędkowanie, plaża czy atrakcje dla dzieci.", "Poproś o jedną rozpiskę „co zawiera / czego nie zawiera”."]
      }
    ],
    itineraries:[
      {
        name:"Prywatny dzień na południu wyspy",
        intro:"Propozycja, którą łatwo dopasować do tempa rodziny.",
        days:[
          {day:"Rano",plan:"Odbiór z hotelu, przejazd do rejonu An Thoi."},
          {day:"Przed południem",plan:"Rejs między wyspami albo spokojniejsza trasa motorówką."},
          {day:"W południe",plan:"Posiłek według potwierdzonego zakresu."},
          {day:"Po południu",plan:"Snorkeling w bezpiecznych warunkach lub powrót i odpoczynek."},
          {day:"Wieczór",plan:"Na życzenie spacer po Sunset Town, osobno potwierdzony w wycenie."}
        ],
        caution:"To przykład planu, nie przyrzeczona trasa rejsu. Zmiany pogody mogą wymusić inny program."
      },
      {
        name:"Wyspa bez rejsu — dobry plan B",
        intro:"Dla osób, które nie chcą lub nie mogą wypłynąć w morze.",
        days:[
          {day:"Rano",plan:"Prywatne auto, lokalna kawiarnia lub wybrany punkt widokowy."},
          {day:"Południe",plan:"Obiad z lokalną kuchnią w dogodnej okolicy."},
          {day:"Popołudnie",plan:"Wybrana atrakcja lądowa na północy lub południu, bez łączenia całej wyspy w jeden dzień."},
          {day:"Wieczór",plan:"Powrót do hotelu albo krótki spacer przy zachodzie słońca."}
        ],
        caution:"Konkretne miejsca dobierz do odległości hotelu i zainteresowań, nie do reklamy gotowego pakietu."
      }
    ],
    faq:[
      {q:"Czy prywatna wycieczka jest naprawdę tylko dla naszej grupy?",a:"Po potwierdzeniu wariantu prywatnego transport i program organizowany jest dla wskazanej grupy. Ustal osobno, czy prywatna jest także łódź, bo samochód i rejs to różne usługi."},
      {q:"Czy 4 wyspy są zawsze lepsze od 3?",a:"Nie. Ważniejsze są konkretne przystanki, czas w wodzie, wielkość grupy i warunki na morzu."},
      {q:"Czy cena zawiera kolejkę Hon Thom?",a:"Tylko gdy została wyraźnie wymieniona w potwierdzonej ofercie. Część rejsów jej nie obejmuje."},
      {q:"Co jeśli rejs odwołano z powodu pogody?",a:"Warunki przełożenia lub zwrotu zależą od danej oferty. Poproś o ich pisemne potwierdzenie przed płatnością."},
      {q:"Czy małe dzieci mogą płynąć motorówką?",a:"Zależy od wieku dziecka, rodzaju łodzi, sprzętu bezpieczeństwa i warunków morskich. Operator musi to indywidualnie potwierdzić."},
      {q:"Czy można tylko wynająć samochód z kierowcą?",a:"Tak, możliwa jest osobna wycena transportu lądowego. Ustal przebieg trasy i czas pracy kierowcy."},
      {q:"Czy jest dostępny polski przewodnik?",a:"Nie gwarantujemy polskojęzycznego przewodnika. Możemy zweryfikować dostępność na konkretną datę; zwykle zapewniamy obsługę po angielsku lub rosyjsku."},
      {q:"Ile wcześniej zarezerwować prywatną łódź?",a:"W szczycie sezonu warto zapytać wcześniej, ale dostępność i warunki pogodowe należy potwierdzać przed wyjściem w morze."}
    ],
    gallery:[
      {src:"/tour/phuquoc/johns/trip3-snorkeling.jpg",alt:"Snorkeling i spokojne przystanki na wyspach"},
      {src:"/tour/phuquoc/johns/trip3-may-rut-trong.jpg",alt:"Jedna z wysp na południu Phu Quoc"},
      {src:"/tour/phuquoc/johns/cable-car-trip.jpg",alt:"Kolejka linowa na Hon Thom"}
    ],
    related:[
      {href:"/pl/phu-quoc-przewodnik",title:"Pełny przewodnik po Phu Quoc",description:"Pogoda, noclegi, wiza, plan tygodnia i koszty."},
      {href:"/pl/danang-hoi-an-hue",title:"Środkowy Wietnam w 5–7 dni",description:"Da Nang, Hoi An i Hue jako drugi etap podróży."},
      {href:"/ru/tours/phu-quoc",title:"Aktualne oferty GoVietStay",description:"Programy operatorów i szczegóły wycieczek po rosyjsku."}
    ],
    references:[
      {url:"https://sunworld.vn/en/hon-thom/transportation/longest-cable-car-in-the-world",label:"Sun World – oficjalne informacje o kolejce Hon Thom"},
      {url:"https://www.vietnam.travel/places-to-go/southern-vietnam/phu-quoc",label:"Vietnam Tourism – Phu Quoc"},
      {url:"https://www.gov.pl/web/wietnam/zwolnienie-z-obowiazku-posiadania-wizy-dla-pobytow-w-celach-turystycznych-nie-dluzszych-niz-45-dni",label:"Gov.pl – zasady wjazdu dla Polaków"}
    ],
    whatsapp:"Hello GoVietStay, I am visiting Phu Quoc from Poland. We are ____ people on ____. Hotel: ____. We want a private boat/private car. Please clarify what is included and availability.",
    leadProduct:"Prywatna wycieczka po Phu Quoc"
  },
  {
    slug:"danang-hoi-an-hue",
    title:"Da Nang, Hoi An i Hue: jak zaplanować podróż po środkowym Wietnamie",
    metaTitle:"Da Nang, Hoi An i Hue 2026/2027 – trasa 5–7 dni i praktyczne rady",
    description:"Da Nang, Hoi An i Hue dla turystów z Polski: pogoda, lotnisko, noclegi, Ba Na Hills, stare miasto Hoi An, cesarskie Hue, prywatny transport i plan 5–7 dni.",
    kicker:"ŚRODKOWY WIETNAM · TRASA POZA UTARTYM SCHEMATEM",
    lead:"Trzy różne miejsca, jeden region i wiele złych planów tworzonych tylko na podstawie zdjęć. Tu znajdziesz realistyczne odległości, wskazówki pogodowe, wybór bazy noclegowej i gotowe warianty podróży bez ciągłego przepakowywania walizek.",
    hero:"/hero-hoian-new.png",
    heroAlt:"Stare miasto Hoi An wieczorem, lampiony i historyczne uliczki",
    keywords:["Da Nang na własną rękę","Hoi An poradnik","Hue Wietnam zwiedzanie","Da Nang Hoi An Hue 7 dni","środkowy Wietnam plan podróży","Ba Na Hills Golden Bridge","Wietnam prywatna wycieczka"],
    quick:[
      {label:"Dobra baza",value:"Da Nang, jeśli chcesz połączyć plaże, Hoi An i Hue."},
      {label:"Ile dni",value:"5–7 dni na region bez nadmiernego pośpiechu."},
      {label:"Hoi An",value:"Z Da Nang zwykle 45–60 minut autem, zależnie od lokalizacji."},
      {label:"Hue",value:"Z Da Nang zwykle 2–3 godziny w jedną stronę, dłużej z postojami."}
    ],
    sections:[
      {
        id:"wybor",overline:"01 · NAJPIERW TRASA",heading:"Da Nang, Hoi An i Hue — czym te miejsca się różnią?",
        paragraphs:[
          "Da Nang jest nowoczesnym nadmorskim miastem z lotniskiem, plażą My Khe i dobrą infrastrukturą. Hoi An ma zabytkowe centrum, charakterystyczne żółte domy, warsztaty i lampiony. Hue to dawna cesarska stolica, z Cytadelą i grobowcami władców dynastii Nguyen.",
          "Nie ma potrzeby wybierać jednego miasta jako „najpiękniejszego”. Lepiej zastanowić się, na czym zależy ci najbardziej: plażowanie, zabytki, jedzenie, spokojne spacery czy intensywne zwiedzanie. Każdy z tych celów prowadzi do innego układu dni."
        ],
        bullets:["Da Nang: wygodna baza i krótsze transfery lotniskowe.", "Hoi An: historyczna atmosfera i wieczorne spacery.", "Hue: dziedzictwo cesarskie oraz lokalna kuchnia.", "Ba Na Hills: osobna całodzienna wycieczka w góry."]
      },
      {
        id:"kiedy",overline:"02 · SEZON I OPADY",heading:"Dlaczego listopad w Da Nang nie wygląda jak styczeń na Phu Quoc",
        paragraphs:[
          "Środkowy Wietnam ma własny rytm pogodowy. Od mniej więcej września do grudnia ryzyko intensywnych deszczów, sztormów i lokalnych podtopień jest większe. Szczególnie Hoi An i okolice rzek mogą odczuć skutki długich opadów. Nie znaczy to, że deszcz pada bez przerwy, ale wycieczki trzeba planować elastycznie.",
          "Na wyjazd nastawiony na połączenie plaży i zabytków często lepsza jest wiosna. W zimie można przyjechać dla kultury i jedzenia, lecz lepiej nie kupować z góry wszystkich aktywności na morzu ani nie uzależniać całego urlopu od jednego górskiego widoku."
        ],
        bullets:["Wiosna: często przyjemne warunki do zwiedzania i spacerów.", "Lato: ciepło, wysoka temperatura; planuj przerwy w cieniu.", "Jesień: większe ryzyko burz, wysokiej wody i odwołanych aktywności.", "Zimą nad morzem: wybór Phu Quoc na plażowanie może być bardziej praktyczny."],
        tip:"Ważna jest prognoza dla konkretnej lokalizacji. Pogoda w Hue, na szczycie Ba Na i na plaży My Khe może być inna tego samego dnia."
      },
      {
        id:"lotnisko",overline:"03 · PRZYLOT",heading:"Lotnisko Da Nang: dokąd jechać po przylocie?",
        paragraphs:[
          "Międzynarodowe lotnisko DAD położone jest blisko miasta. Do wielu hoteli w Da Nang można dotrzeć w około 15–30 minut, jednak trzeba uwzględnić porę dnia i czas po kontroli paszportowej. Do Hoi An najczęściej jedzie się około 45–70 minut.",
          "Jeśli przybywasz wieczorem, nie planuj od razu przejazdu do Hue i długiego zwiedzania. Pierwszy dzień lepiej przeznaczyć na odpoczynek, kolację i krótki spacer. Prywatny transfer warto rozważyć przy dzieciach, większym bagażu i późnej godzinie przylotu."
        ],
        bullets:["W zapytaniu o transfer podaj numer lotu i dokładny hotel.", "Sprawdź, czy cena obejmuje postój w razie opóźnienia i dopłatę nocną.", "Kierowca i licencjonowany przewodnik turystyczny to osobne funkcje."]
      },
      {
        id:"danang",overline:"04 · DA NANG",heading:"Da Nang poza plażą: jak wybrać najciekawsze miejsca",
        paragraphs:[
          "Plaża My Khe, most Smoka nad rzeką Han i półwysep Son Tra to popularne punkty. Nie warto jednak wciskać ich wszystkich między długą wyprawę na Ba Na Hills i wyjazd do Hoi An. Ułóż atrakcje według kierunku przejazdu, a nie popularności na Instagramie.",
          "Marble Mountains (Góry Marmurowe) leżą na trasie między Da Nang a Hoi An i dobrze pasują do spokojniejszego popołudnia, jeśli masz wygodne buty i nie przeszkadzają ci schody. Son Tra oferuje piękne widoki, ale górskie drogi wymagają ostrożności przy deszczu."
        ],
        bullets:["My Khe: poranny spacer lub odpoczynek, z uwzględnieniem warunków kąpieli.", "Dragon Bridge: harmonogram pokazów sprawdź na bieżąco.", "Marble Mountains: świątynie, jaskinie, stopnie i ciepło.", "Son Tra: krajobrazy, natura, dojazd zależny od pogody."],
        image:"/tour/marble.jpg",imageAlt:"Marmurowe Góry niedaleko Da Nang"
      },
      {
        id:"bana",overline:"05 · BA NA HILLS",heading:"Golden Bridge i Ba Na Hills: co naprawdę zajmuje cały dzień",
        paragraphs:[
          "Słynny Złoty Most znajduje się w górskim kompleksie Ba Na Hills, do którego wjeżdża się kolejką linową. Ruch turystyczny, pogoda i odległości w obrębie kompleksu sprawiają, że jeden szybki przejazd „tylko na most” nie zawsze jest dobrym pomysłem.",
          "Przy zakupie biletu sprawdź, czy obejmuje on kolejkę, bufet, poszczególne atrakcje i ewentualny transport z hotelu. Wyższe położenie oznacza niższą temperaturę i możliwą mgłę nawet w słoneczny dzień w centrum Da Nang."
        ],
        bullets:["Zaplanuj niemal cały dzień, zwłaszcza w sezonie.", "Weź cienką kurtkę i coś przeciwdeszczowego.", "Zweryfikuj ceny dzieci według aktualnych zasad operatora.", "Nie traktuj pogody na dole jako gwarancji widoków na szczycie."],
        image:"/tour/bana.jpg",imageAlt:"Golden Bridge i kompleks Ba Na Hills"
      },
      {
        id:"hoian",overline:"06 · HOI AN",heading:"Hoi An o zachodzie słońca: zabytki, jedzenie i lampiony",
        paragraphs:[
          "Stare miasto Hoi An znajduje się na Liście Światowego Dziedzictwa UNESCO. Warto przyjechać na kilka godzin, wejść do wybranych zabytkowych domów, zjeść lokalny posiłek i zostać do wieczora, gdy uliczki rozświetlają lampiony.",
          "Las kokosowy Cam Thanh z okrągłymi łodziami to osobna aktywność. Jeśli łączysz go z Hoi An, lepiej wyruszyć po południu, a nie próbować zwiedzać dodatkowo Hue tego samego dnia. W porze intensywnych deszczów poziom wody może ograniczać dostęp do części centrum."
        ],
        bullets:["Cao lầu, mì Quảng i bánh bao bánh vạc — lokalne dania warte poznania.", "Historyczne domy i niektóre atrakcje mogą wymagać biletu.", "Lampiony są piękne, ale centrum bywa zatłoczone.", "Przy dzieciach zadbaj o czas na odpoczynek i wygodny powrót do hotelu."],
        image:"/tour/hoian.jpg",imageAlt:"Lampiony i wieczorny klimat Hoi An"
      },
      {
        id:"hue",overline:"07 · HUE",heading:"Hue i droga przez Hai Van: jeden dzień czy nocleg?",
        paragraphs:[
          "Hue było stolicą Wietnamu w czasach dynastii Nguyen. Zwiedzanie Cesarskiej Cytadeli, pagody Thien Mu i grobowców wymaga więcej czasu niż standardowy przystanek w trasie. Jeśli szczególnie lubisz historię, nocleg w Hue da więcej swobody.",
          "Z Da Nang można jechać przez malowniczą przełęcz Hai Van lub wybrać szybszą trasę przez tunel, zależnie od pogody. Po drodze warto rozważyć krótkie postoje w okolicach Lang Co i laguny Lap An. Wycieczka przez przełęcz wydłuża przejazd, dlatego nie upychaj zbyt wielu zabytków."
        ],
        bullets:["Cytadela: zarezerwuj kilka godzin na spokojne zwiedzanie.", "Grobowiec Khai Dinh: widowiskowy, ale ze schodami.", "Thien Mu: znana pagoda nad Rzeką Perfumową.", "Przełęcz Hai Van: najlepsza przy dobrej widoczności i bezpiecznych warunkach."],
        image:"/tour/hue.jpg",imageAlt:"Cesarskie zabytki miasta Hue"
      },
      {
        id:"transport",overline:"08 · JAK SIĘ PRZEMIESZCZAĆ",heading:"Prywatny kierowca, pociąg, taksówka czy wycieczka grupowa?",
        paragraphs:[
          "Na krótkich trasach w Da Nang taksówka lub aplikacja przewozowa często wystarczą. Przy wycieczce obejmującej Hoi An i kilka dodatkowych punktów wygodniej bywa wynająć auto z kierowcą na określoną liczbę godzin. Między Da Nang a Hue jest również połączenie kolejowe, atrakcyjne dla miłośników widoków.",
          "Prywatny samochód jest opłacalny pod względem wygody zwłaszcza dla rodzin i czteroosobowych grup, ale nie zawsze będzie najtańszy dla dwóch osób. Przed wyborem sprawdź, czy potrzebujesz też przewodnika z uprawnieniami i w jakim języku."
        ],
        bullets:["Taksówka: krótkie przejazdy po mieście.", "Kierowca na dzień: wygoda przy różnych przystankach.", "Pociąg: krajobrazowa trasa Da Nang–Hue, lecz stały rozkład.", "Przewodnik: dodatkowa wiedza, szczególnie w Cytadeli."],
        tip:"GoVietStay oferuje przede wszystkim wsparcie po angielsku i rosyjsku. Polski przewodnik tylko na zapytanie i po potwierdzeniu."
      },
      {
        id:"koszty",overline:"09 · BUDŻET I WIZA",heading:"Co trzeba doliczyć do ceny wycieczki i jak działa zwolnienie z wizy",
        paragraphs:[
          "Polacy podróżujący turystycznie mogą obecnie przebywać w Wietnamie bez wizy do 45 dni w ramach programu obowiązującego do 14 sierpnia 2028 roku. Paszport powinien być ważny co najmniej sześć miesięcy, a wszystkie pozostałe wymogi wjazdowe muszą być spełnione.",
          "Budżet licz osobno na hotel, posiłki, wejściówki, transport i usługi przewodnika. Przy porównywaniu ofert „private tour” zwróć uwagę, czy podana kwota jest za samochód, za całą grupę, czy za osobę oraz czy wlicza bilety do Ba Na Hills i zabytków Hue."
        ],
        bullets:["W sprawie wizy sprawdź komunikat polskiego MSZ i aktualną regulację wietnamską.", "Przy nietypowym celu podróży sprawdź właściwe przepisy, nie zakładaj automatycznie zwolnienia.", "Potwierdź politykę anulacji i terminy płatności przed zaliczką.", "Jeśli podróżują dzieci, podaj wiek, a przy biletach zależnych od wzrostu także wzrost."]
      },
      {
        id:"alternatywy",overline:"10 · RODZINY I NIEPOGODA",heading:"Co robić, gdy pada i jak podróżować bez stresu",
        paragraphs:[
          "W dniach deszczowych przydadzą się krótsze trasy, lokale gastronomiczne, warsztaty kulinarne, muzea i czas w hotelu. Przy ostrzeżeniach burzowych nie jedź na siłę na przełęcz ani na wycieczkę morską. Hoi An przy długich opadach bywa zagrożone podtopieniami.",
          "Jeśli podróżujesz z seniorami lub małymi dziećmi, nie planuj pięciu atrakcji dziennie. Marble Mountains i grobowce w Hue mają schody, a w Ba Na Hills trzeba sporo chodzić. Lepiej zobaczyć mniej i mieć energię na wieczorny spacer."
        ],
        bullets:["Zostaw 1 dzień zamienny na warunki pogodowe.", "Na wycieczki w góry zabierz lekką kurtkę i wygodne obuwie.", "Poinformuj organizatora o ograniczonej mobilności i potrzebie fotelika."]
      },
      {
        id:"phuquoc",overline:"11 · JAK POŁĄCZYĆ REGIONY",heading:"Da Nang i Phu Quoc w jednej podróży — kiedy to ma sens?",
        paragraphs:[
          "Jeśli masz tylko tydzień w Wietnamie, nie polecamy dzielić go między południową wyspę Phu Quoc a środkowy Wietnam. Dodatkowy lot i transfer mogą zabrać dzień lub więcej. Przy 12–14 dniach taki podział daje więcej możliwości, szczególnie jeśli część wyjazdu ma być aktywna, a reszta plażowa.",
          "W porze zimowej Phu Quoc bywa pogodowo bardziej przewidywalne do kąpieli, podczas gdy Da Nang i Hoi An mogą mieć deszcze. Wiosną środkowy Wietnam często sprzyja zarówno zwiedzaniu, jak i krótkim wypadom nad morze."
        ],
        bullets:["Nie kupuj dwóch oddzielnych wycieczek bez sprawdzenia lotów wewnętrznych.", "Przy wylocie międzynarodowym zostaw rozsądny bufor na przesiadkę.", "Zobacz osobny przewodnik po Phu Quoc przed ostatecznym wyborem trasy."]
      }
    ],
    itineraries:[
      {
        name:"5 dni: Da Nang jako wygodna baza",
        intro:"Dużo zobaczysz, ale bez zmiany hotelu co noc.",
        days:[
          {day:"Dzień 1",plan:"Przylot do Da Nang, odbiór i spokojny spacer w mieście."},
          {day:"Dzień 2",plan:"Ba Na Hills i Złoty Most, o ile pogoda pozwala."},
          {day:"Dzień 3",plan:"Cam Thanh i Hoi An od popołudnia do wieczora."},
          {day:"Dzień 4",plan:"Hue: przejazd, Cytadela i jedna dodatkowa atrakcja."},
          {day:"Dzień 5",plan:"Plaża, kawa, zakupy lub krótsze zwiedzanie przed lotem."}
        ],
        caution:"W październiku–grudniu nie rezerwuj na sztywno wszystkich atrakcji na otwartym powietrzu."
      },
      {
        name:"7 dni: bardziej uważnie i bez pośpiechu",
        intro:"Dodatkowe dwa dni bardzo zmieniają komfort podróży.",
        days:[
          {day:"Dzień 1",plan:"Przylot i odpoczynek w Da Nang."},
          {day:"Dzień 2",plan:"Ba Na Hills lub spokojny dzień, zależnie od prognozy."},
          {day:"Dzień 3",plan:"Hoi An i lokalna kuchnia; możliwość noclegu na miejscu."},
          {day:"Dzień 4",plan:"Marble Mountains i okolice Da Nang."},
          {day:"Dzień 5",plan:"Wyjazd do Hue przez Hai Van przy dobrej pogodzie; nocleg w Hue."},
          {day:"Dzień 6",plan:"Cytadela, Thien Mu i wybrany grobowiec; powrót lub drugi nocleg."},
          {day:"Dzień 7",plan:"Bezpieczny bufor i wyjazd na lotnisko."}
        ],
        caution:"Wersja z noclegiem w Hue ma sens dla osób szczególnie zainteresowanych historią; dla rodzin można ją uprościć."
      }
    ],
    faq:[
      {q:"Czy z Da Nang do Hoi An da się dojechać tego samego dnia?",a:"Tak. Podróż samochodem trwa zwykle około 45–60 minut, zależnie od lokalizacji hotelu i ruchu."},
      {q:"Czy Hue można zobaczyć podczas jednodniowej wycieczki z Da Nang?",a:"Tak, ale trzeba wyjechać wcześnie i ograniczyć liczbę zabytków. Na spokojniejszy pobyt polecamy nocleg w Hue."},
      {q:"Czy listopad to dobry termin na Da Nang?",a:"Można przyjechać dla kultury i jedzenia, lecz ryzyko mocnych opadów i podtopień jest podwyższone. Plażowanie nie powinno być jedynym celem."},
      {q:"Czy bilet na Ba Na Hills obejmuje bufet?",a:"Nie w każdym wariancie. Zakres biletu, kanatki, posiłku i dodatkowych atrakcji sprawdź w konkretnej ofercie."},
      {q:"Czy podróż po regionie wymaga prywatnego kierowcy?",a:"Nie. Krótkie trasy da się pokonać taksówką, ale prywatne auto często ułatwia całodniowe wycieczki rodzinne."},
      {q:"Czy Polacy potrzebują wizy na tygodniowy urlop?",a:"Przy obecnych przepisach turystyczne pobyty do 45 dni mogą być objęte zwolnieniem wizowym, pod warunkiem spełnienia wymogów. Zasady sprawdź przed wylotem."},
      {q:"Jak połączyć Hue, Hoi An i Phu Quoc?",a:"Na taką podróż warto przeznaczyć 12–14 dni lub dłużej i osobno zaplanować przelot między centralnym Wietnamem a wyspą."},
      {q:"Czy GoVietStay zapewnia polskojęzycznych przewodników?",a:"Nie obiecujemy tego bez wcześniejszego potwierdzenia. Zwykle organizujemy obsługę po angielsku lub rosyjsku; inne języki są na zapytanie."}
    ],
    gallery:[
      {src:"/tour/bana.jpg",alt:"Golden Bridge w górach Ba Na"},
      {src:"/tour/haivan.jpg",alt:"Przełęcz Hai Van pomiędzy Da Nang i Hue"},
      {src:"/tour/coconut.jpg",alt:"Łodzie koszykowe w lesie kokosowym Cam Thanh"}
    ],
    related:[
      {href:"/pl/phu-quoc-przewodnik",title:"Phu Quoc – pełny przewodnik",description:"Zima na plaży, noclegi i plan na 7–14 dni."},
      {href:"/pl/phu-quoc-wycieczki-prywatne",title:"Prywatne atrakcje Phu Quoc",description:"Wariant po wypoczynku i zwiedzaniu środkowego Wietnamu."},
      {href:"/ru/tours/hoi-an-coconut-forest",title:"Hoi An i Cam Thanh",description:"Sprawdź aktualny program GoVietStay w wersji rosyjskiej."},
      {href:"/ru/tours/ba-na-hills",title:"Ba Na Hills",description:"Warianty wizyty przy Golden Bridge."}
    ],
    references:[
      {url:"https://whc.unesco.org/en/list/948",label:"UNESCO – Hoi An Ancient Town"},
      {url:"https://whc.unesco.org/en/list/678",label:"UNESCO – Complex of Hue Monuments"},
      {url:"https://www.gov.pl/web/wietnam/zwolnienie-z-obowiazku-posiadania-wizy-dla-pobytow-w-celach-turystycznych-nie-dluzszych-niz-45-dni",label:"Gov.pl – aktualne zasady wjazdu dla Polaków"},
      {url:"https://vietnam.travel/things-to-do/weather-and-climate-vietnam",label:"Vietnam Tourism – klimat różnych regionów Wietnamu"}
    ],
    whatsapp:"Hello GoVietStay, we are visiting Da Nang, Hoi An and Hue from Poland. Dates: ____. Adults/children: ____. Hotel: ____. We want a private itinerary and airport transfer. Please advise.",
    leadProduct:"Trasa prywatna Da Nang – Hoi An – Hue"
  }
];

export function getPolishGuide(slug: string) {
  return polishGuides.find((page) => page.slug === slug);
}
