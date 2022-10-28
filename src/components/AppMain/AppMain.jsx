import BurgerIngredients from "../BurgerIngredients";
import PropTypes from "prop-types";
import { clsx } from "clsx";

const AppMain = (props) => {
    return (
        // <main className={clsx(props.className)} style={{ height: props.height, ...props.style, overflow: "hidden" }}>
        <main className={clsx(props.className)} style={{ ...props.style, overflow: "hidden" }}>
            <BurgerIngredients data={props.data} height={500} />
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