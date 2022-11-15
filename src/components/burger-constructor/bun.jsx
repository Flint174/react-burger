import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { ConstructorElementEmpty } from "./constructor-element-empty";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const Bun = ({ type, extraClass }) => {
    const bun = useSelector(store => store.constructorReducer.bun)
    const alt = 'Выберите булку'

    const bunTop = useMemo(() => {
        return bun ? (
            <ConstructorElement
                text={bun.name + ' (верх)'}
                thumbnail={bun.image}
                price={bun.price}
                isLocked={true}
                type="top"
                extraClass={extraClass}
            />
        ) : (
            <ConstructorElementEmpty
                type={'top'}
                extraClass={extraClass}
                text={alt}
            />
        )
    }, [bun, extraClass])

    const bunBottom = useMemo(() => {
        return bun ? (
            <ConstructorElement
                text={bun.name + ' (низ)'}
                thumbnail={bun.image}
                price={bun.price}
                isLocked={true}
                type="bottom"
                extraClass={extraClass}
            />
        ) : (
            <ConstructorElementEmpty
                type={'bottom'}
                extraClass={extraClass}
                text={alt}
            />
        )
    }, [bun, extraClass])

    const bunResult = type === 'top' ? bunTop : bunBottom

    return (
        <>
            {bunResult}
        </>
    )
}

export const bunPropTypes = {
    type: PropTypes.oneOf(['top', 'bottom']).isRequired,
    extraClass: PropTypes.string
}

Bun.propTypes = bunPropTypes
