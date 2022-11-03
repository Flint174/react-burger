import { ingredientTypes } from "../../utils/types";
import { InfoField } from "./InfoField";

export const IngredientDetails = ({ show, onClose, data }) => {

    const info = data
        ? [
            {
                name: 'Калории, ккал',
                value: data.calories
            },
            {
                name: 'Белки, г',
                value: data.proteins
            },
            {
                name: 'Жиры, г',
                value: data.fat
            },
            {
                name: 'Углеводы, г',
                value: data.carbohydrates
            }
        ]
        : []

    return (
        <>
            <img src={data.image_large} alt="done" height={240} width={520} />

            <p className="text text_type_main-medium mt-4">
                {data.name}
            </p>

            <div className="flex row gap-5 mt-8 mb-15">
                {info.map((el, index) => <InfoField {...el} key={index} />)}
            </div>
        </>
    )
}

export const ingredientDetailsPropTypes = {
    data: ingredientTypes
}
