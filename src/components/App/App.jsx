import { AppHeader } from "../AppHeader";
import { AppMain } from "../AppMain";
import { useEffect, useState } from "react";
import { ingredientsUrl } from "../../utils/constants";

export const App = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(ingredientsUrl)
            .then(res => res.json())
            .then(json => setData(json.data))
            .catch(err => console.error(err))
    }, [])

    return (
        <>
            <AppHeader />
            <AppMain data={data} />
        </>
    );
}
