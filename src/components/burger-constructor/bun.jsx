import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { ConstructorElementEmpty } from "./constructor-element-empty";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { CompositionListItem } from "./composition-list-item";

export const Bun = ({ type }) => {
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
            />
        ) : (
            <ConstructorElementEmpty
                type={'top'}
                text={alt}
            />
        )
    }, [bun])

    const bunBottom = useMemo(() => {
        return bun ? (
            <ConstructorElement
                text={bun.name + ' (низ)'}
                thumbnail={bun.image}
                price={bun.price}
                isLocked={true}
                type="bottom"
            />
        ) : (
            <ConstructorElementEmpty
                type={'bottom'}
                text={alt}
            />
        )
    }, [bun])

    const bunResult = type === 'top' ? bunTop : bunBottom

    return (
        <CompositionListItem isLocked={true}>
            {bunResult}
        </CompositionListItem>
    )
}

export const bunPropTypes = {
    type: PropTypes.oneOf(['top', 'bottom']).isRequired
}

Bun.propTypes = bunPropTypes
