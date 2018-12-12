import React from 'react'

import styled from 'styled-components'

import { Colors } from '@site/util'

import chroma from 'chroma-js'

const FooterContainer = styled.footer`
  text-align: center;
  color: ${chroma(Colors.gray)
    .brighten(2)
    .hex()};
  padding: 3rem 2.5rem;
  width: 100%;

  span {
    color: ${Colors.red};
  }
`

export default () => (
  <FooterContainer>
    This site was designed and built by yours truly <span>♥</span>
  </FooterContainer>
)
