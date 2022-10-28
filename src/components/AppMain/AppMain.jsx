import BurgerIngredients from "../BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor";
import PropTypes from "prop-types";
import { clsx } from "clsx";

const AppMain = ({ data }) => {
    const bun = data.find(el => el.type === 'bun')
    const ingredients = data.filter(el => el.type !== 'bun')

    return (
        // <main className={clsx(props.className)} style={{ height: props.height, ...props.style, overflow: "hidden" }}>
        <main className={clsx('flex row justify_content-center')}>
            <BurgerIngredients className="mr-10" data={data} height={500} />
            <BurgerConstructor bun={bun} ingredients={ingredients} />
        </main>
    )
}

export const appMainPropTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
            type: PropTypes.string,
            proteings: PropTypes.number,
            fat: PropTypes.number,
            carbohydrates: PropTypes.number,
            calories: PropTypes.number,
            price: PropTypes.number,
            image: PropTypes.string,
            image_mobile: PropTypes.string,
            image_large: PropTypes.string,
            __v: PropTypes.number
        })
    ).isRequired,
    // height: PropTypes.number.isRequired
}

AppMain.propTypes = appMainPropTypes

export default AppMain