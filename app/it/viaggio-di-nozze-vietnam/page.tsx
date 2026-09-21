import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../components/seo/NewStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(stayMetadata('it','honeymoon'),'it','honeymoon');
export default function Page(){return <StayPageUpgrade lang="it" topic="honeymoon"><NewStayLanding lang="it" topic="honeymoon"/></StayPageUpgrade>;}
