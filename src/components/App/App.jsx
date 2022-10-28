import AppHeader from "../AppHeader";
import AppMain from "../AppMain";
import { data } from "./utils/data";

function App () {
    // TODO: add a listener for window resize event
    const appMainHeight = 500
    return (
        <>
            <AppHeader />
            {/* <AppMain data={data} height={appMainHeight} /> */}
            <AppMain data={data} />
        </>
    );
}

export default App;

