import { Bun } from "./bun";
import { CompositionList } from "./composition-list";

export const Composition = () => {
    return (
        <div className="flex column gap-4">
            <Bun type={'top'} extraClass="mt-25 ml-8" />
            <CompositionList />
            <Bun type={'bottom'} extraClass="ml-8" />
        </div>
    )
}
