import React from "react"
import styled from "styled-components"

import { breakpoint, Colors } from "@site/util"

const Card = styled.div`
  display: flex;
  background: white;
  font-size: 0.9rem;
  color: ${Colors.gray};
  text-align: center;
  flex-shrink: 0;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.03);
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  ${breakpoint.tablet`
    margin-bottom: 0;
    margin-right: 1rem;
    flex-direction: row;
    align-items: center;
    width: 35rem;
  `};

  &:last-child {
    margin: 0;

    &:after {
      content: "";
      position: absolute;
      right: -1rem;
      width: 1rem;
      height: 1px;
      display: block;
    }
  }

  p {
    opacity: 0.8;
    text-align: left;
    font-style: italic;
    margin: 0;
    line-height: 1.5em;
  }
`

const Title = styled.div`
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.25em;
  text-align: left;

  span {
    display: block;
    opacity: 0.5;
    font-size: 0.8rem;
    font-weight: normal;
    margin: 0;
  }

  ${breakpoint.tablet`
    text-align: center;
    margin-bottom: 0.5rem;

    span {
      margin: 0 0.3rem;
    }
  `}
`

const TitleArea = styled.div<{ color: string }>`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-right: 1rem;
  margin-right: 1rem;

  ${breakpoint.tablet`
    align-items: center;  
    margin-bottom: 0;
    border-right: 1px solid ${Colors.lightGray};
    flex-direction: column;
  `}

  img {
    width: 2rem;
    height: 2rem;
    border-radius: 1rem;
    border: 2px solid ${({ color }) => color};
    margin: 0 0.5rem 0 0;

    ${breakpoint.tablet`
      align-items: center;  
      width: 4rem;
      height: 4rem;
      border-radius: 2.5rem;
      margin: 0 0 0.5rem 0;
      flex-direction: column;
    `}
  }
`

interface Props {
  name: string
  title: string
  image: string
  text: string
  color: string
}

export const Testimonial: React.FunctionComponent<Props> = ({
  name,
  title,
  image,
  text,
  color,
}) => (
  <Card>
    <TitleArea color={color}>
      <img src={`/people/${image}`} />
      <Title>
        {name} <span>{title}</span>
      </Title>
    </TitleArea>
    <p>“{text}”</p>
  </Card>
)
