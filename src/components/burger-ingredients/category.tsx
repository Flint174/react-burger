import { forwardRef, useMemo } from "react";
import { useAppSelector } from "../../hooks/use-store";
import { CategoryType } from "../../utils/types";
import { Card } from "./card";

interface CategoryProps {
  type: CategoryType;
}

export const Category = forwardRef<HTMLElement, CategoryProps>(
  ({ type }, ref) => {
    const { data } = useAppSelector((store) => store.ingredientsReducer);
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
