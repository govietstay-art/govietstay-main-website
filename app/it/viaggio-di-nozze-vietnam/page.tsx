import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../components/seo/NewStayLanding';
export const metadata:Metadata=stayMetadata('it','honeymoon');
export default function Page(){return <NewStayLanding lang="it" topic="honeymoon"/>;}
