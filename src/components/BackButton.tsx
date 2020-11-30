import React from 'react'

import { Link, StaticQuery, graphql } from 'gatsby'

import styled from 'styled-components'

import { Colors } from '@site/util'

type Props = {
  to: string
  children: string
  className?: string
}

const Button = styled(Link)`
  color: ${Colors.gray};
  opacity: 0.5;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 1.2em;

  img {
    margin: 0 0.5rem 0 0;
    padding: 0;
    opacity: 0.75;
  }
`

export const BackButton = ({ children, to, className }: Props) => (
  <StaticQuery
    query={graphql`
      query {
        backImage: file(relativePath: { eq: "sprites/back.svg" }) {
          publicURL
        }
      }
    `}
    render={({ backImage: { publicURL: backImage } }) => (
      <Button className={className || ''} to={to}>
        <img src={backImage} />
        {children}
      </Button>
    )}
  />
)
