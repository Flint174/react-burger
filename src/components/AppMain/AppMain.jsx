import { BurgerIngredients } from "../BurgerIngredients";
import { BurgerConstructor } from "../BurgerConstructor";
import { clsx } from "clsx";

export const AppMain = () => {

    return (
        <main className={clsx('flex row justify_content-center gap-10')}>
            <BurgerIngredients height={500} />
            <BurgerConstructor />
        </main>
    )
}
