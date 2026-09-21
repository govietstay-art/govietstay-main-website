import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../components/seo/NewStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(stayMetadata('ru','honeymoon'),'ru','honeymoon');
export default function Page(){return <StayPageUpgrade lang="ru" topic="honeymoon"><NewStayLanding lang="ru" topic="honeymoon"/></StayPageUpgrade>;}
