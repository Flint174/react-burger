import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { InfoField } from "./info-field";

export const IngredientDetails = () => {
  const { data } = useSelector((store) => store.ingredientsReducer);
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
