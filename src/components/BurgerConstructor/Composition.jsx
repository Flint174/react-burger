import PropTypes from "prop-types";
import {
    ConstructorElement,
    DragIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

const List = ({ ingredients, bun, height }) => {
    return (
        <div className="flex column gap-4">
            {
                bun &&
                <ConstructorElement
                    text={bun.name + ' (верх)'}
                    thumbnail={bun.image}
                    price={bun.price}
                    isLocked={true}
                    type="top"
                    extraClass="mt-25 ml-8"
                />
            }
            <div
                className="flex column gap-4"
                style={{
                    overflow: 'auto',
                    height: height
                }}
            >
                {
                    ingredients &&
                    ingredients.map((el, index) => (
                        <div className="flex row align_items-center" key={index}>
                            <DragIcon />
                            <ConstructorElement
                                text={el.name}
                                thumbnail={el.image}
                                price={el.price}
                                extraClass="ml-2"
                            />
                        </div>
                    ))
                }
            </div>

            {
                bun &&
                <ConstructorElement
                    text={bun.name + ' (низ)'}
                    thumbnail={bun.image}
                    price={bun.price}
                    isLocked={true}
                    type="bottom"
                    extraClass="ml-8"
                />
            }

        </div>
    )
}

const ingredient = {
    _id: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number
}

export const listPropTypes = {
    ingredients: PropTypes.arrayOf(
        PropTypes.shape(ingredient)
    ),
    bun: PropTypes.shape(ingredient),
    height: PropTypes.number
}

List.propTypes = listPropTypes

export default List