import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../../components/seo/NewStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(stayMetadata('ru','villas'),'ru','villas');
export default function Page(){return <StayPageUpgrade lang="ru" topic="villas"><NewStayLanding lang="ru" topic="villas"/></StayPageUpgrade>;}
