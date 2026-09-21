import NightBitesCityLightsPage, {nightMetadata} from '../../../../components/NightBitesCityLightsPage';
import LocalExperiencesGuideNotice from '../../../../components/LocalExperiencesGuideNotice';
export const metadata=nightMetadata('it');
export default function Page(){return <><LocalExperiencesGuideNotice locale="it"/><NightBitesCityLightsPage locale="it"/><LocalExperiencesGuideNotice locale="it" placement="bottom"/></>;}
