import React from 'react'
import PostLink from './PostLink'
import get from 'lodash/get'
import './BlogPostList.sass'

export const BlogPostList = ({ data, styles, filterBy, header }) => {
  if (!styles) {
    styles = {
      postList: 'blog-post-list',
      postListItem: 'blog-post-list__item',
    }
  }
  if (!filterBy) {
    filterBy = () => true
  }
  const edges = get(data, 'allMarkdownRemark.edges', [])
  const posts = edges.filter(
    edge => !!get(edge, 'node.frontmatter.date', false) && filterBy(edge)
  )
  console.log({ posts })
  return (
    <div className={styles.postList}>
      {header ? <div>{header}</div> : null}
      {posts.map((post, index) => (
        <PostLink
          styles={styles}
          key={post.node.id || index}
          post={post.node}
        />
      ))}
    </div>
  )
}

export default BlogPostList
