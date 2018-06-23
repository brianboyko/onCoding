import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import './PostLink.sass'

export const PostLink = ({ post, styles }) => {
  const postPath = get(post, 'frontmatter.path', '')
  const title = get(post, 'frontmatter.title', '')
  const date = get(post, 'frontmatter.date', '')
  const tags = get(post, 'frontmatter.tags', [])
  const excerpt = get(post, 'excerpt', '')
  return (
    <div className={'postlink'}>
      <div className={'postlink__title'}>
        <Link to={postPath} className={'postlink__title__link'}>
          {title}
        </Link>
      </div>

      <div className={'postlink__date'}>{date}</div>
      <div className={'postlink__tags'}>
        {tags.map(tag => (
          <span key={tag} className={'postlink__tags__tag'}>
            [{tag}]
          </span>
        ))}
      </div>
      <div className={'postlink__excerpt'}>{excerpt}</div>
    </div>
  )
}

export default PostLink
