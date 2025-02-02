import { MouseEventHandler } from "react";

export enum TypeButton {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
};

const ButtonSubmit = (
  {children, className, type, disabled, onClick}:
  {
    children: string,
    className: string,
    type: TypeButton,
    disabled: boolean,
    onClick?: MouseEventHandler<HTMLButtonElement>,
   }
) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default ButtonSubmit;