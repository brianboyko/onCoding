import React from 'react'
import './Chip.sass'

export const Chip = ({ children }) => (
  <span className={'chip__container'}>
    {children.map((child, i) => (
      <span key={i} className="chip">
        {child}
      </span>
    ))}
  </span>
)

export default Chip
