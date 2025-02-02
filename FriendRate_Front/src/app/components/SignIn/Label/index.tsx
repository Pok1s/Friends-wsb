import React from 'react'

const Label = (
  { children, className, htmlFor }:
  { children?: React.ReactNode, className: string, htmlFor: string }
) => {
  return (
    <label className={className} htmlFor={htmlFor}>{children}</label>
  )
}

export default Label;
