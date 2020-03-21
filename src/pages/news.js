import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'

const News = ({ data }) => {
  const articles = data.allShopifyArticle.edges

  return (
    <>
      <SEO title="News" />
      <h1>Blog</h1>

      {articles.map(article => (
        <div>{article.node.title}</div>
      ))}
    </>
  )
}

export default News

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
