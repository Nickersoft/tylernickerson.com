import React, { Component } from "react";

import styled from "styled-components";

import { Icon } from "@site/components";
import { breakpoint } from "@site/util";

type Props = {
  selectedIcon: string;
};

const Grid = styled.div`
  display: none;
  flex-direction: column;

  ${breakpoint.desktop`
    display: flex;
  `}
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const RowIconLink = styled.a`
  margin-left: 1.5rem;

  &:first-child {
    margin-left: 0;
  }
`;

const RowIcon = styled(Icon)`
  opacity: ${({ depressed }) => (depressed ? 0.75 : 1)};
`;

class HomepageIconGrid extends Component<Props> {
  getIcon(name: string) {
    const { selectedIcon } = this.props;

    return (
      <RowIconLink href={`#${name}`} key={name}>
        <RowIcon depressed={selectedIcon === name} size={96} name={name} />
      </RowIconLink>
    );
  }

  render() {
    const getIcon = this.getIcon.bind(this);

    return (
      <Grid>
        <Row>{["datql", "edart", "linguistic"].map(getIcon)}</Row>
        <Row>{["odict", "push"].map(getIcon)}</Row>
        <Row>{["fission"].map(getIcon)}</Row>
      </Grid>
    );
  }
}

export default HomepageIconGrid;
