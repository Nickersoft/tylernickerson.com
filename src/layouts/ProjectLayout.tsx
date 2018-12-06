import React, { PureComponent } from 'react'

import { get } from 'lodash'

import styled from 'styled-components'

import ProjectsSideBar from './components/ProjectSideBar'
import MainLayout from './MainLayout'

const ProjectsPage = styled.div`
  display: flex;
  padding: 0;
`

type Props = {
  children: JSX.Element | JSX.Element[]
  pageContext: {
    project?: {
      key: string
    }
  }
}

class Projects extends PureComponent<Props> {
  render() {
    const {
      children,
      pageContext: { project },
    } = this.props

    const key = get(project, 'key', '')

    return (
      <ProjectsPage>
        <ProjectsSideBar selectedProjectKey={key} />
        {children}
      </ProjectsPage>
    )
  }
}

export default Projects
