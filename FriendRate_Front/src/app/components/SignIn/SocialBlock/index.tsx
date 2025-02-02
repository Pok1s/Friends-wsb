import React from 'react'

const SocialBlock = (
  { children, className }:
  { children: React.ReactNode, className: string }
) => {
  return (
    <div className={className}>{children}</div>
  )
}

export default SocialBlock;
