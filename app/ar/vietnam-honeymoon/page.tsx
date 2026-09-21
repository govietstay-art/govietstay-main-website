import type {Metadata} from 'next';
import ArabicStayLanding,{arabicStayMetadata} from '../../../components/seo/ArabicStayLanding';
export const metadata:Metadata=arabicStayMetadata('honeymoon');
export default function Page(){return <ArabicStayLanding topic="honeymoon"/>;}
