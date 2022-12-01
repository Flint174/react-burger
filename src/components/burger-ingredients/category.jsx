import { forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { categoryPropType } from "../../utils/types";
import { Card } from "./card";

export const Category = forwardRef(({ type }, ref) => {
  const { data } = useSelector((store) => store.ingredientsReducer);

  const cardsList = useMemo(
    () =>
      data
        .filter((el) => el.type === type.value)
        .map((info) => <Card extraClass="ml-4" info={info} key={info._id} />),
    [data, type]
  );

  return (
    <section ref={ref}>
      <h2 className="text text_type_main-large mb-6">
        {type.text || type.value}
      </h2>
      <div className="flex wor wrap mb-10">{cardsList}</div>
    </section>
  );
});

Category.propTypes = {
  type: categoryPropType.isRequired,
};
