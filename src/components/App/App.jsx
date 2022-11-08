import { AppHeader } from "../AppHeader";
import { AppMain } from "../AppMain";
import { useEffect, useState } from "react";
import { INGREDIENTS_URL } from "../../utils/constants";
import { AppDataContext } from "../../context/appContext";
import { handleError, request } from "../../utils/request";

export const App = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        request(INGREDIENTS_URL)
            .then(json => setData(json.data))
            .catch(handleError)
    }, [])

    return (
        <>
            <AppHeader />
            <AppDataContext.Provider value={{ data }}>
                <AppMain />
            </AppDataContext.Provider>
        </>
    );
}
