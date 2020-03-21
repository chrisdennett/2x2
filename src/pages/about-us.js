import React from 'react'
import img2 from '../images/biog-mother-daughter.png'

import SEO from '~/components/seo'

const AboutUs = () => (
  <>
    <SEO title="About Us" />
    <h1>About Us</h1>
    <secion>
      <p>
        Two by Two is a Family Fashion business set in the market town of
        Ulverston in Cumbria
      </p>
      <p>
        The shop was founded by my stepfather Chris Benefield who, locally was
        fondly known as Mr Rabbit from his days when he ran the Tinners Rabbit
        Art Gallery and Picture Framers next door.
      </p>
      <p>
        Mr Rabbit sadly lost his battle with cancer in August 2012. We miss him
        so much. He always had a plan.
      </p>
    </secion>
    <section>
      <p>These days 2x2 is run by Mother and Daughter team...</p>
      <img src={img2} alt="Janet Benefield and Rachel Weaver" />
    </section>
  </>
)

export default AboutUs
