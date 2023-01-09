import { useParams } from "react-router";
import { useAppSelector } from "../../hooks/use-store";
import { InfoField } from "./info-field";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import { FC } from "react";

interface IngredientDetailsProps {
  isModal?: boolean;
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({
  isModal = false,
}) => {
  const { data } = useAppSelector((store) => store.ingredientsReducer);
  const { id } = useParams();
  const details = data.find((el) => el._id === id);

  const info = details
    ? [
        {
          name: "Калории, ккал",
          value: details.calories,
        },
        {
          name: "Белки, г",
          value: details.proteins,
        },
        {
          name: "Жиры, г",
          value: details.fat,
        },
        {
          name: "Углеводы, г",
          value: details.carbohydrates,
        },
      ]
    : [];
  if (!details) return <></>;

  return (
    <>
      <div
        className={clsx(
          styles.title_container,
          "flex row align-items_center mt-10 ml-10 mr-10",
          { "justify-content_center": !isModal }
        )}
      >
        <h3 className="text text_type_main-large">Детали ингредиента</h3>
      </div>

      <img src={details.image_large} alt="done" height={240} width={520} />

      <p className="text text_type_main-medium mt-4">{details.name}</p>

      <div className="flex row gap-5 mt-8 mb-15">
        {info.map((el, index) => (
          <InfoField {...el} key={index} />
        ))}
      </div>
    </>
  );
};
