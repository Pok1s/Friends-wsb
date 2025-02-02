import React, { MouseEventHandler } from 'react';

const ButtonToggle = (
  { children, onClick, className, disabled }:
  {
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    className: string,
    disabled?: boolean,
  }
) => {
  return (
    <button
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
    </button>
  )
}

export default ButtonToggle