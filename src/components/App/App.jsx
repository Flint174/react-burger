import AppHeader from "../AppHeader";
import AppMain from "../AppMain";
import { data } from "./utils/data";

function App () {
    return (
        <>
            <AppHeader />
            <AppMain data={data} />
        </>
    );
}

export default App;

