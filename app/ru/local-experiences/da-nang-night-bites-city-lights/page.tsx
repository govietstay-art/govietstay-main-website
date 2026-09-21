import NightBitesCityLightsPage, {nightMetadata} from '../../../../components/NightBitesCityLightsPage';
import LocalExperiencesGuideNotice from '../../../../components/LocalExperiencesGuideNotice';
// Standard guide speaks English; Russian is available only upon confirmed request.
export const metadata={...nightMetadata('ru'),robots:{index:true,follow:true}};
export default function Page(){return <><LocalExperiencesGuideNotice locale="ru"/><NightBitesCityLightsPage locale="ru"/><LocalExperiencesGuideNotice locale="ru" placement="bottom"/></>;}
