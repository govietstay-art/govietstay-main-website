import type {Metadata} from 'next';
import NewStayLanding,{stayMetadata} from '../../../components/seo/NewStayLanding';
export const metadata:Metadata=stayMetadata('en','honeymoon');
export default function Page(){return <NewStayLanding lang="en" topic="honeymoon"/>;}
