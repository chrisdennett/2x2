import React from 'react'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const OurCollectionsPage = () => (
  <>
    <SEO title="Home" keywords={[`fashion`, `clothes`, `shop`]} />
    <ProductGrid />
  </>
)

export default OurCollectionsPage
