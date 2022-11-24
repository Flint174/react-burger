import { useParams } from "react-router-dom";

export const IngredientsModal = () => {
  const { id } = useParams();
  return <div>IngredientsModal id={id}</div>;
};
