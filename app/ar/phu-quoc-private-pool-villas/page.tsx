import type {Metadata} from 'next';
import ArabicStayLanding,{arabicStayMetadata} from '../../../components/seo/ArabicStayLanding';
import StayPageUpgrade,{upgradedStayMetadata} from '../../../components/seo/StayPageUpgrade';
export const metadata:Metadata=upgradedStayMetadata(arabicStayMetadata('villas'),'ar','villas');
export default function Page(){return <StayPageUpgrade lang="ar" topic="villas"><ArabicStayLanding topic="villas"/></StayPageUpgrade>;}
