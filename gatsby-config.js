module.exports = {
  pathPrefix: '/onCoding',
  siteMetadata: {
    title: 'Brian Boyko (On Coding)',
    description:
      'Coding blog of Brian Boyko',
    siteUrl: 'https://brianboyko.github.io/onCoding/',
  },
  plugins: [
    'gatsby-transformer-remark',
    `gatsby-remark-copy-linked-files`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1080,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: 'markdown-pages',
      },
    },
  ],
}
