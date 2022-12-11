import { FC, FormEvent, ReactElement } from "react";

interface FormProps {
  title?: string;
  form: ReactElement;
  actions: ReactElement;
  footer?: ReactElement;
  onSubmit?: (event: FormEvent) => void;
  onReset?: (event: FormEvent) => void;
}

export const Form: FC<FormProps> = ({
  title,
  form,
  actions,
  footer,
  onSubmit,
  onReset,
}) => {
  return (
    <div className="flex column align-items_center justify-items_start">
      {title && <h1 className="text text_type_main-medium mb-6">{title}</h1>}
      <form
        className="flex column align-items_center gap-6"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {form}
        {actions}
      </form>
      {footer && (
        <div className="flex column align-items_center gap-4 text text_type_main-default text_color_inactive mt-20">
          {footer}
        </div>
      )}
    </div>
  );
};
