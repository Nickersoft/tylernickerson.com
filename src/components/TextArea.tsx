import styled from "styled-components"

import { Colors } from "@site/util"

export const TextArea = styled.div`
  padding: 1.5rem 0;
  color: ${Colors.gray};

  h3 {
    color: ${Colors.gray};
    margin: 0 0 1rem;
  }

  p {
    text-align: justify;
    font-size: 1rem;
    line-height: 1.5em;
  }

  a {
    color: #1a1a1a;
    transition: all 0.3s ease-in-out;
  }

  img {
    box-shadow: none !important;
  }

  div.gatsby-highlight {
    margin-bottom: 1.45rem;
  }
`
