import LocalizedVisa, {localizedVisaMetadata} from "../../visa/LocalizedVisa";
export const metadata = localizedVisaMetadata("uk");
export default function Page(){ return <LocalizedVisa lang="uk" />; }
