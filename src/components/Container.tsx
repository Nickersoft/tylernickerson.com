import styled from 'styled-components'

import { breakpoint } from '@site/util'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;

  ${breakpoint.desktop`
    width: 1180px;
  `}
`
