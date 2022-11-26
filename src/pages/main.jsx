import { BurgerConstructor } from "../components/burger-constructor";
import { BurgerIngredients } from "../components/burger-ingredients";

export const Main = () => {
  return (
    <main className="flex row justify-content_center gap-10">
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
};
