import { AppHeader } from "../app-header";
import { fetchIngredietns } from "../../services/actions/ingredients-actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";

export const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchIngredietns())
    }, [dispatch])

    return (
        <>
            <AppHeader />
            <main className='flex row justify-content_center gap-10'>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </>
    );
}
