import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import ContextProvider from '~/provider/ContextProvider'

import { GlobalStyle } from '~/utils/styles'
import Navigation from '~/components/Navigation'
import Contact from '../components/Contact/contact'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
`

const Layout = ({ children }) => {
  return (
    <ContextProvider>
      <GlobalStyle />
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <>
            <Navigation siteTitle={data.site.siteMetadata.title} />

            <Wrapper>
              {children}
              <footer>
                <Contact />
                <p>Copyright © {new Date().getFullYear()} Two by Two</p>
                <p>All prices in GBP</p>
              </footer>
            </Wrapper>
          </>
        )}
      />
    </ContextProvider>
  )
}

export default Layout
