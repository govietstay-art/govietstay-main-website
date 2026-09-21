import type {Metadata} from 'next';
import ArabicStayLanding,{arabicStayMetadata} from '../../../components/seo/ArabicStayLanding';
export const metadata:Metadata=arabicStayMetadata('villas');
export default function Page(){return <ArabicStayLanding topic="villas"/>;}
