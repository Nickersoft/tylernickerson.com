import React from "react";

import { StaticQuery, graphql } from "gatsby";
import styled, { css } from "styled-components";
import { get, zipObject, map } from "lodash";

import { Brands } from "@site/util";

type IconContainerProps = {
  colors: string[];
  size: number;
  depressed: boolean;
};

const IconContainer = styled.div<IconContainerProps>`
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: box-shadow 0.25s ease-in-out;

  ${({ colors, size, depressed }) => {
    const [lightColor, darkColor] = colors;

    const shadowOffset = size * 0.125;
    const shadowBlur = size * 0.25;
    const shadowValues = [shadowOffset, shadowOffset, shadowBlur];
    const shadowShorthand = shadowValues.map((x) => `${x}px`).join(" ");
    const shadowColor = "rgba(0, 0, 0, 0.12)";
    const shadow = `${shadowShorthand} ${shadowColor}`;

    const shadowDepressedShorthand = shadowValues
      .map((x) => `${x / 3}px`)
      .join(" ");
    const shadowDepressedColor = "rgba(0, 0, 0, 0.15)";
    const shadowDepressed = `${shadowDepressedShorthand} ${shadowDepressedColor}`;

    return css`
      background: ${darkColor};
      background: linear-gradient(135deg, ${lightColor}, ${darkColor});
      box-shadow: ${depressed ? shadowDepressed : shadow};
      width: ${size}px;
      height: ${size}px;

      ${!depressed && `&:hover { box-shadow: ${shadowDepressed}; }`}
    `;
  }}
`;

const IconImage = styled.img`
  width: 73%;
  margin: 2px 0 0;
  filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.1));
`;

type Props = {
  name: string;
  size: number;
  depressed: boolean;
  className?: string;
};

const Icon = ({ name, className, size, depressed }: Props) => (
  <StaticQuery
    query={graphql`
      query {
        appIcons: allFile(filter: { sourceInstanceName: { eq: "icons" } }) {
          edges {
            node {
              name
              publicURL
            }
          }
        }
      }
    `}
    render={({ appIcons }) => {
      const edges = get(appIcons, "edges", []);
      const iconMap = zipObject(
        map(edges, "node.name"),
        map(edges, "node.publicURL")
      );

      return (
        <IconContainer
          colors={get(Brands, name, ["#fff", "#000"])}
          size={size}
          depressed={depressed}
          style={{ width: `${size}px`, height: `${size}px` }}
          className={className}
        >
          <IconImage src={get(iconMap, name, "")} alt={name} />
        </IconContainer>
      );
    }}
  />
);

Icon.defaultProps = {
  size: 96,
};

export { Icon };
