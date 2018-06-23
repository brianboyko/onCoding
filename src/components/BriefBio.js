import React from 'react'
import get from 'lodash/get'
import './BriefBio.sass'
import boykoJPG from './img/boyko.jpg'

export const BriefBio = props => (
  <div className="bio">
    <div>
      <img src={boykoJPG} />
      <p>
        Brian Boyko is a software engineer and the technical co-creator of the
        Mayday PAC, which raised $11M in 2014 in a non-partisan attempt to fight
        corruption, as well as the author of{' '}
        <a href="https://www.amazon.com/Importing-Democracy-Brian-Boyko-ebook/dp/B00G8TC4HY">
          Importing Democracy: A quest to find the American Dream (in New
          Zealand)
        </a>
      </p>
      <p>His software engineering blog can be found at <a href="https://brianboyko.github.io/onCoding">brianboyko.github.io/onCoding</a></p>
    </div>
  </div>
)

export default BriefBio
