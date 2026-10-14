import LocalizedVisa, {localizedVisaMetadata} from "../../visa/LocalizedVisa";
export const metadata = localizedVisaMetadata("ro");
export default function Page(){ return <LocalizedVisa lang="ro" />; }
