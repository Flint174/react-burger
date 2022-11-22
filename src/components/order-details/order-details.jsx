import PropTypes from "prop-types";
import doneSvg from "../../images/done.svg";

export const OrderDetail = ({ orderNumber }) => {
    return (
        <>
            <p className="text text_type_digits-large mt-4">
                {('0'.repeat(6) + orderNumber).slice(-6)}
            </p>

            <p className="text text_type_main-medium mt-8">
                идентификатор заказа
            </p>

            <img className="m-15" src={doneSvg} alt="done" height={120} width={120} />

            <p className="text text_type_main-default">
                Ваш заказ начали готовить
            </p>

            <p className="text text_type_main-default text_color_inactive mt-2 mb-30">
                Дождитесь готовности на орбитальной станции
            </p>
        </>
    )
}

OrderDetail.propTypes = {
    orderNumber: PropTypes.number.isRequired
}
