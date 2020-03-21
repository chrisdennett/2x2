import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'

const News = ({ data }) => {
  const articles = data.allShopifyArticle.edges

  return (
    <>
      <SEO title="News" />
      <Link to="/">Home</Link>
      <h1>News y'know</h1>

      {articles.map(article => (
        <div>{article.node.title}</div>
      ))}
    </>
  )
}

export default News

export const query = graphql`
  {
    allShopifyArticle(
      filter: {
        blog: {
          id: { eq: "Shopify__Blog__Z2lkOi8vc2hvcGlmeS9CbG9nLzI3OTkwNDk=" }
        }
      }
      sort: { order: DESC, fields: publishedAt }
    ) {
      edges {
        node {
          title
          url
        }
      }
    }
  }
`
