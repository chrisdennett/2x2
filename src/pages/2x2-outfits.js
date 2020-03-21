import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'

const Outfits = ({ data }) => {
  const articles = data.allShopifyArticle.edges

  return (
    <>
      <SEO title="News" />
      <Link to="/">Home</Link>
      <h1>2x2 Outfits of the Day</h1>

      {articles.map(article => (
        <div>{article.node.title}</div>
      ))}
    </>
  )
}

export default Outfits

export const query = graphql`
  {
    allShopifyArticle(
      filter: {
        blog: {
          id: { eq: "Shopify__Blog__Z2lkOi8vc2hvcGlmeS9CbG9nLzgwNjE1NTU5" }
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
