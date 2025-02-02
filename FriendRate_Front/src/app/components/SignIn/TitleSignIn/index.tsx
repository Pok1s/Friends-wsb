import { ReactNode } from "react";

const TitleSignIn = (
  { children, className }:
  { children: ReactNode, className: string }
) => {
  return (
    <h2 className={className}>{children}</h2>
  )
}

export default TitleSignIn;
