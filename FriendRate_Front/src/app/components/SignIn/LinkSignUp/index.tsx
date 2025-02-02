const LinkSignUp = (
  { children, className }:
  { children: React.ReactNode, className: string }
) => {
  return (
    <p className={className}>{children}</p>
  )
}

export default LinkSignUp