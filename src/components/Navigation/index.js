import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { breakpoints } from '../../utils/styles'
import { FaShoppingBasket } from 'react-icons/fa'
import StoreContext from '~/context/StoreContext'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <Wrapper>
      <Container>
        <MenuLink to="/" style={{ flex: 1, textAlign: 'center' }}>
          <SiteTitle>{siteTitle}</SiteTitle>
        </MenuLink>
        <MenuLink to="/cart" style={{ maxWidth: 40 }}>
          {hasItems && <CartCounter>{quantity}</CartCounter>}
          <FaShoppingBasket />
        </MenuLink>
      </Container>
      <SiteNav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/our-collection">Our Collection</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/2x2-outfits">Blog</Link>
          </li>
        </ul>
      </SiteNav>
    </Wrapper>
  )
}
export default Navigation

const SiteNav = styled.nav`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);

  ul {
    display: flex;
    justify-content: space-around;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    display: inline;

    a {
      color: white;
      text-decoration: none;
    }
  }
`

const Wrapper = styled.div`
  background: #888e91;
  margin-bottom: 1.45rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.8);
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1rem 1rem 0.8rem 1rem;
  margin: 0 auto;
  max-width: 960px;
`

const SiteTitle = styled.span`
  color: #fff;
  font-size: 2.5rem;
  font-weight: bold;
  font-family: 'Girassol', cursive;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.2);
`

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 2rem;
  font-weight: normal;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }
`

const CartCounter = styled.span`
  font-size: 1rem;
  float: right;
  font-weight: bold;
  float: right;
  margin: -5px 0 0 -2px;
  z-index: 20;
`
