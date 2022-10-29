import BurgerIngredients from "../BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor";
import { ingredientTypes } from "../../utils/types";
import PropTypes from "prop-types";
import { clsx } from "clsx";

const AppMain = ({ data }) => {
    const bun = data.find(el => el.type === 'bun')
    const ingredients = data.filter(el => el.type !== 'bun')

    return (
        <main className={clsx('flex row justify_content-center gap-10')}>
            <BurgerIngredients data={data} height={500} />
            <BurgerConstructor bun={bun} ingredients={ingredients} />
        </main>
    )
}

export const appMainPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape(ingredientTypes)
    ).isRequired,
}

AppMain.propTypes = appMainPropTypes

export default AppMain