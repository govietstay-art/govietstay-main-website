import type {Metadata} from 'next';
import ArabicStayLanding,{arabicStayMetadata} from '../../../components/seo/ArabicStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(arabicStayMetadata('honeymoon'),'ar','honeymoon');
export default function Page(){return <StayPageUpgrade lang="ar" topic="honeymoon"><ArabicStayLanding topic="honeymoon"/></StayPageUpgrade>;}
