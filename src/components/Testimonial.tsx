import React from "react"
import styled from "styled-components"

import { Colors } from "@site/util"

const Card = styled.div<{ color: string }>`
  display: flex;
  background: white;
  font-size: 0.9rem;
  width: 40rem;
  color: ${Colors.gray};
  text-align: center;
  flex-shrink: 0;
  margin-right: 1rem;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.06), 0 16px 32px rgba(0, 0, 0, 0.03);
  flex-direction: row;
  align-items: center;
  position: relative;

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

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 2.5rem;
    border: 4px solid ${({ color }) => color};
    margin: 0 0 0.5rem 0;
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
  margin-bottom: 0.5rem;
  line-height: 1.25em;

  span {
    display: block;
    opacity: 0.5;
    font-size: 0.8rem;
    font-weight: normal;
    margin: 0 0.3rem;
  }
`

const TitleArea = styled.div`
  flex-shrink: 0;
  border-right: 1px solid ${Colors.lightGray};
  padding-right: 1rem;
  margin-right: 1rem;
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
  <Card color={color}>
    <TitleArea>
      <img src={`/people/${image}`} />
      <Title>
        {name} <span>{title}</span>
      </Title>
    </TitleArea>
    <p>“{text}”</p>
  </Card>
)
