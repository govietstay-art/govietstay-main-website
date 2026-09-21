import NightBitesCityLightsPage, {nightMetadata} from '../../../../components/NightBitesCityLightsPage';
import LocalExperiencesGuideNotice from '../../../../components/LocalExperiencesGuideNotice';
export const metadata=nightMetadata('en');
export default function Page(){return <><LocalExperiencesGuideNotice locale="en"/><NightBitesCityLightsPage locale="en"/><LocalExperiencesGuideNotice locale="en" placement="bottom"/></>;}
