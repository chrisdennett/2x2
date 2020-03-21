import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'

const Outfits = ({ data }) => {
  const articles = data.allShopifyArticle.edges

  return (
    <>
      <SEO title="2x2 Outfits of the Day" />
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
    allShopifyArticle(sort: { order: DESC, fields: publishedAt }) {
      edges {
        node {
          title
          url
        }
      }
    }
  }
`
