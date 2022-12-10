import { forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { CategoryType, IngredientType } from "../../utils/types";
import { Card } from "./card";

interface CategoryProps {
  type: CategoryType;
}

export const Category = forwardRef<HTMLElement, CategoryProps>(
  ({ type }, ref) => {
    // TODO: убрать каст типов и any после типизации store
    const { data } = useSelector((store: any) => store.ingredientsReducer) as {
      data: IngredientType[];
    };

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
  }
);
