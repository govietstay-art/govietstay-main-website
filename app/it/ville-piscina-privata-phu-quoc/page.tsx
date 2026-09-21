import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../components/seo/NewStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(stayMetadata('it','villas'),'it','villas');
export default function Page(){return <StayPageUpgrade lang="it" topic="villas"><NewStayLanding lang="it" topic="villas"/></StayPageUpgrade>;}
