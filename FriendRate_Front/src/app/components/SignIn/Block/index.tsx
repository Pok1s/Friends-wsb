import { MouseEventHandler } from "react";

const Block = (
  { children, className, onClick }:
  {
    children?: React.ReactNode,
    className?: string,
    onClick?: MouseEventHandler<HTMLDivElement>
  }
) => {
  return (
    <div className={className} onClick={onClick}>{children}</div>
  )
}

export default Block;
