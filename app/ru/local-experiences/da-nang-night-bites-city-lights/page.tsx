import NightBitesCityLightsPage, {nightMetadata} from '../../../../components/NightBitesCityLightsPage';
import LocalExperiencesGuideNotice from '../../../../components/LocalExperiencesGuideNotice';
export const metadata=nightMetadata('ru');
export default function Page(){return <><LocalExperiencesGuideNotice locale="ru"/><NightBitesCityLightsPage locale="ru"/><LocalExperiencesGuideNotice locale="ru" placement="bottom"/></>;}
