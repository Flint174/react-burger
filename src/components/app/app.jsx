import { AppHeader } from "../app-header";
import { AppMain } from "../app-main";
import { fetchIngredietns } from "../../services/actions/ingredients-actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIngredietns())
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <AppMain />
        </>
    );
}
