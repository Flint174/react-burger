import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";
import { clsx } from "clsx";

export const AppMain = () => {

    return (
        <main className={clsx('flex row justify-content_center gap-10')}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}
