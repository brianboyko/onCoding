import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'

export const PostLink = ({ post, styles }) => {
  const postPath = get(post, 'frontmatter.path', '')
  const title = get(post, 'frontmatter.title', '')
  const date = get(post, 'frontmatter.date', '')
  return (
    <li className={styles.postListItem || 'blog-post-list__item'}>
      <Link to={postPath}>
        {title} ({date})
      </Link>
    </li>
  )
}

export default PostLink
