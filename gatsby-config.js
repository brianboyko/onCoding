module.exports = {
  pathPrefix: '/onPolitics',
  siteMetadata: {
    title: 'Brian Boyko (On Politics)',
    description:
      'Political blog of Brian Boyko, software engineer and anti-corruption reformer',
    siteUrl: 'https://brianboyko.github.io/onPolitics/',
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
