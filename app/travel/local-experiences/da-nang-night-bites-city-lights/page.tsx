import NightBitesCityLightsPage, {nightMetadata} from '../../../../components/NightBitesCityLightsPage';
import LocalExperiencesGuideNotice from '../../../../components/LocalExperiencesGuideNotice';
// This public landing is now approved for discovery; keep pricing and availability
// explicitly subject to a final written quotation in the page content.
export const metadata={...nightMetadata('en'),robots:{index:true,follow:true}};
export default function Page(){return <><LocalExperiencesGuideNotice locale="en"/><NightBitesCityLightsPage locale="en"/><LocalExperiencesGuideNotice locale="en" placement="bottom"/></>;}
