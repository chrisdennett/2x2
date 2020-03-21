import React from 'react'
import styled from '@emotion/styled'
import './styles.css'

import SEO from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`fashion`, `clothes`, `shop`]} />
    <SubTitle>
      "There is no doubt a new dress is a help under all circumstances"
    </SubTitle>
    <ProductGrid />
  </>
)

export default IndexPage

const SubTitle = styled.h2`
  max-width: 600px;
  font-weight: normal;
  font-size: 2rem;
  margin: 40px auto;
  text-align: center;
  color: #aaa;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.8);
`
