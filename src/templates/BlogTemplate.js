import React from 'react'
import get from 'lodash/get'
import Chip from '../ui/Chip'
import './BlogTemplate.sass';

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        path
        title
        tags
        featuredImage {
          publicURL
          childImageSharp {
            sizes(maxWidth: 1240) {
              srcSet
            }
          }
        }
      }
    }
  }
`

const BlogTemplate = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const image = get(frontmatter, 'featuredImage.publicURL', '')

  return (
    <div className="blog-post__container">
      <div className="blog-post">
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            height: frontmatter.height || 'auto',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              color: 'white',
              padding: '150px 20px 20px 20px',
              background: `rgba(0, 0, 0, 0.3)`,
            }}
          >
            <h1>{frontmatter.title}</h1>
            <h2>{frontmatter.date}</h2>
            {Array.isArray(frontmatter.tags) && frontmatter.tags.length ? (
              <Chip>
                {frontmatter.tags.map((tag, index) => (
                  <span key={index}>{tag}</span>
                ))}
              </Chip>
            ) : null}
          </div>
        </div>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export default BlogTemplate
