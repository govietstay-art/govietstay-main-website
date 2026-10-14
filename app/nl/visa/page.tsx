import LocalizedVisa, {localizedVisaMetadata} from "../../visa/LocalizedVisa";
export const metadata = localizedVisaMetadata("nl");
export default function Page(){ return <LocalizedVisa lang="nl" />; }
