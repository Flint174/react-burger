import { BurgerIngredients } from "../burger-ingredients";
import { BurgerConstructor } from "../burger-constructor";
import { clsx } from "clsx";

export const AppMain = () => {

    return (
        <main className={clsx('flex row justify_content-center gap-10')}>
            <BurgerIngredients height={500} />
            <BurgerConstructor />
        </main>
    )
}
