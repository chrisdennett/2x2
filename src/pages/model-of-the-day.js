import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'

const ModelOfTheDay = ({ data }) => {
  const articles = data.allShopifyArticle.edges

  return (
    <>
      <SEO title="News" />
      <Link to="/">Home</Link>
      <h1>Model of the day</h1>

      {articles.map(article => (
        <div>{article.node.title}</div>
      ))}
    </>
  )
}

export default ModelOfTheDay

export const query = graphql`
  {
    allShopifyArticle(
      filter: {
        blog: {
          id: { eq: "Shopify__Blog__Z2lkOi8vc2hvcGlmeS9CbG9nLzU4NTU1NjU=" }
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
