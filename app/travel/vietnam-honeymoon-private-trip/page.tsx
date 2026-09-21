import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../components/seo/NewStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(stayMetadata('en','honeymoon'),'en','honeymoon');
export default function Page(){return <StayPageUpgrade lang="en" topic="honeymoon"><NewStayLanding lang="en" topic="honeymoon"/></StayPageUpgrade>;}
