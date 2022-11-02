import { createPortal } from "react-dom"
import { modalsElement } from "../../utils/constants"
import { ingredientTypes, modalTypes } from "../../utils/types";
import { Modal } from "../Modal";
import { ModalOverlay } from "../ModalOverlay";
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

    return createPortal((
        <>
            {
                show &&

                <ModalOverlay onClose={onClose}>
                    <Modal onClose={onClose}>

                        <div className="flex row align_items-center mt-10 ml-10 mr-10 " style={{ height: 64, width: 640 }}>
                            <p className="text text_type_main-large">
                                Детали ингредиента
                            </p>
                        </div>

                        <img src={data.image_large} alt="done" height={240} width={520} />

                        <p className="text text_type_main-medium mt-4">
                            {data.name}
                        </p>

                        <div className="flex row gap-5 mt-8 mb-15">
                            {info.map((el, index) => <InfoField {...el} key={index} />)}
                        </div>
                    </Modal>
                </ModalOverlay>

            }
        </>
    ), modalsElement)
}

export const ingredientDetailsPropTypes = {
    ...modalTypes,
    data: ingredientTypes
}