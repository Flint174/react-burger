import { AppHeader } from "../AppHeader";
import { AppMain } from "../AppMain";
import { data } from "../../utils/data";

export const App = () => {
    return (
        <>
            <AppHeader />
            <AppMain data={data} />
        </>
    );
}
