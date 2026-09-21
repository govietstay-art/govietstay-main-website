import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../components/seo/NewStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(stayMetadata('en','villas'),'en','villas');
export default function Page(){return <StayPageUpgrade lang="en" topic="villas"><NewStayLanding lang="en" topic="villas"/></StayPageUpgrade>;}
