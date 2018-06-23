import React from 'react'
import Link from 'gatsby-link'
import BlogPostList from '../components/BlogPostList'
import BriefBio from '../components/BriefBio'

const IndexPage = props => (
  <div>
    <BriefBio />
    <BlogPostList
      {...props}
      styles={{
        postList: 'blog-post-list',
        postListItem: 'blog-post-list__item',
      }}
      header={<h3>Latest Blog Posts</h3>}
    />
  </div>
)

// needed to query for the blog posts.
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
          }
        }
      }
    }
  }
`

export default IndexPage
