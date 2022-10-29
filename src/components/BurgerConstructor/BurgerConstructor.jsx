import { listPropTypes, Composition } from "./Composition";
import {
    CurrencyIcon,
    Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";

export const BurgerConstructor = ({ bun, ingredients, className }) => {
    const total = 200
    const height = 400
    return (
        <div className={clsx('flex column', className)} style={{ width: 600 }}>
            <Composition bun={bun} ingredients={ingredients} height={height} />
            <div className="mt-10 flex row align_items-center" style={{ alignSelf: 'flex-end' }}>
                <p className="text text_type_digits-medium mr-2">{total}</p>
                <CurrencyIcon />
                <Button htmlType="button" extraClass="ml-10">ОФОРМИТЬ ЗАКАЗ</Button>
            </div>
        </div>
    )
}

export const burgerConstructorPropTypes = listPropTypes

BurgerConstructor.propTypes = burgerConstructorPropTypes
