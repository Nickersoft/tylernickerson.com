import React, { PureComponent } from 'react'

import { Link } from 'gatsby'

import styled from 'styled-components'

import { Icon } from '@site/components'

type SideNavProps = {
  activeProjectIndex: number
}

const SideNav = styled.nav<SideNavProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  border-right: 2px solid #e6e6e6;
  padding: 0;
  padding-right: 2.5rem;

  &:after {
    content: '\u25b6';
    color: #bbb;
    font-size: 24px;
    position: absolute;
    right: 0.5rem;
    transition: top 0.2s ease-in-out;
    top: calc((64px * 1) + 1rem + (64px / 2));
    top: ${({ activeProjectIndex }) =>
      64 * activeProjectIndex + 16 * activeProjectIndex + 64 / 2}px;
    transform: translateY(-50%);
  }
`

const NavIcon = styled(Icon)`
  margin-bottom: 1rem;
  cursor: pointer;
`

type Props = {
  selectedProjectKey: string
}

class ProjectsSideBar extends PureComponent<Props> {
  projects = ['linguistic', 'datql', 'odict', 'push', 'fission', 'edart']

  getIcon(name: string) {
    const { selectedProjectKey } = this.props

    const active = selectedProjectKey === name
    const opacity = active ? 0.75 : 1

    return (
      <Link key={name} to={`/projects/${name}`} style={{ opacity }}>
        <NavIcon depressed={active} size={64} name={name} />
      </Link>
    )
  }

  render() {
    const { selectedProjectKey } = this.props

    return (
      <SideNav activeProjectIndex={this.projects.indexOf(selectedProjectKey)}>
        {this.projects.map(this.getIcon.bind(this))}
      </SideNav>
    )
  }
}

export default ProjectsSideBar
