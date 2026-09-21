import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../../components/seo/NewStayLanding';
export const metadata:Metadata=stayMetadata('ru','villas');
export default function Page(){return <NewStayLanding lang="ru" topic="villas"/>;}
