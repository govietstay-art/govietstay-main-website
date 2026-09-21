import NightBitesCityLightsPage, {nightMetadata} from '../../../../components/NightBitesCityLightsPage';
import LocalExperiencesGuideNotice from '../../../../components/LocalExperiencesGuideNotice';
// Standard guide speaks English; Italian is available only upon confirmed request.
export const metadata={...nightMetadata('it'),robots:{index:true,follow:true}};
export default function Page(){return <><LocalExperiencesGuideNotice locale="it"/><NightBitesCityLightsPage locale="it"/><LocalExperiencesGuideNotice locale="it" placement="bottom"/></>;}
