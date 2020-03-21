import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`fashion`, `clothes`, `shop`]} />
    <h1>Hi Rachel</h1>
    <p>
      This is just a test to see if lising products and the basket checkout all
      work.
    </p>
    <ProductGrid />
  </>
)

export default IndexPage
