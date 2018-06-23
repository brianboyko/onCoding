import React from 'react'
import Link from 'gatsby-link'
import './header.sass'

const Header = ({ siteTitle }) => (
  <div className={'header__container'}>
    <div className={'header__title'}>
      <h1 style={{ margin: 0 }}>
        <Link to="/" className={'header__title__text'}>
          {siteTitle}
        </Link>
      </h1>
    </div>
  </div>
)

export default Header
