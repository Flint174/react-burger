import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { ConstructorElementEmpty } from "./constructor-element-empty";
import PropTypes from "prop-types";
import { ingredientTypes } from "../../utils/types";

export const Bun = ({ bun, type, extraClass }) => {
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

    const bunResult = type === 'top'
        ? bunTop
        : bunBottom

    return (
        <>
            {bunResult}
        </>
    )
}

export const bunProps = {
    bun: PropTypes.shape(ingredientTypes),
    type: PropTypes.oneOf(['top', 'bottom']).isRequired,
    extraClass: PropTypes.string
}

Bun.propTypes = bunProps
