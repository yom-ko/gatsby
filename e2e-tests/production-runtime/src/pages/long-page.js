import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const LongPage = () => (
  <Layout>
    <h1>Hi from the long page</h1>
    <p>Welcome to long page</p>
    <div style={{ height: `200vh` }} />
    <Link to="/" data-testid="below-the-fold">
      Go back to the homepage
    </Link>
  </Layout>
)

export default LongPage
