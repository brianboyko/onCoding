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
        corruption. Since then he's been working full-time in software engineering
        and is the technical co-founder of <a href="https://freety.me">FreeTy.me</a>.
      </p>
      <p>His political blog can be found at <a href="https://brianboyko.github.io/onPolitics">brianboyko.github.io/onPolitics</a></p>
    </div>
  </div>
)

export default BriefBio
