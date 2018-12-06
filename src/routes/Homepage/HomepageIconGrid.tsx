import React, { Component } from 'react'

import { Link } from 'gatsby'

import styled from 'styled-components'

import { Icon } from '@site/components'

type Props = {}

const Grid = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const RowIcon = styled(Icon)`
  margin-left: 1.5rem;

  &:first-child {
    margin-left: 0;
  }
`

const getIcon = (name: string) => <RowIcon name={name} key={name} />

class HomepageIconGrid extends Component<Props> {
  render() {
    return (
      <Grid>
        <Row>{['datql', 'edart', 'linguistic'].map(getIcon)}</Row>
        <Row>{['odict', 'push'].map(getIcon)}</Row>
        <Row>{['fission'].map(getIcon)}</Row>
      </Grid>
    )
  }
}

export default HomepageIconGrid
