import React, { PureComponent } from 'react'

import { get, map } from 'lodash'

import styled from 'styled-components'

import { Colors, Keyframes } from '@site/util'

const MainContent = styled.div`
  flex: 1;
  padding: 0 2.5rem;
  animation: ${Keyframes.fadeIn} 0.5s ease-in-out;
`

const ContentHeader = styled.header`
  display: block;
  width: 100%;
  padding: 0.75rem 0;
  border-bottom: 2px solid ${Colors.lightGray};
`

const ContentHeaderLabel = styled.h1`
  font-size: 1.125rem;
  text-transform: uppercase;
  color: ${Colors.gray};
  opacity: 0.5;
  letter-spacing: 4.5px;
  line-height: 1.2em;
  margin: 0;
  padding: 0;
`

const ContentHeaderTitle = styled.h2`
  font-size: 3rem;
  line-height: 1.18em;
  margin: 0;
  padding: 0;
  color: ${Colors.gray};
`

const ContentHeaderYear = styled.span`
  font-size: 2em;
  line-height: 1.75em;
  color: ${Colors.gray};
  opacity: 0.4;
`

const ContentBody = styled.div`
  padding: 1.5rem 0;
  color: ${Colors.gray};

  h3 {
    color: ${Colors.gray};
  }

  p {
    text-align: justify;
    font-size: 1rem;
    line-height: 1.5em;
  }
`

const ContentOverview = styled.div`
  background: #f6f6f6;
  width: 20rem;
  float: right;
  border-radius: 6px;
  margin: 1.5rem 0 1.5rem 1.5rem;
  padding: 1.75rem;

  h2 {
    font-size: 0.875rem;
    letter-spacing: 3.5px;
    color: ${Colors.gray};
    opacity: 0.5;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: ${Colors.gray};
    transition: color 0.3s ease-in-out;

    &:active,
    &:focus {
      color: ${Colors.gray};
    }

    &:hover {
      color: ${Colors.blue};
    }
  }
`

const ContentOverviewList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
`

const ContentOverviewListItem = styled.li`
  padding: 0;
  color: ${Colors.gray};
  margin: 0;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`

const ContentOverviewListItemLabel = styled.span`
  display: block;
  font-weight: 700;
  line-height: 1.25em;
  color: #777;
`

type Props = {
  title: string
  years: string
  html: string
}

type OverviewInfo = {
  label: string
}

class ProjectsContent extends PureComponent<Props> {
  overviewProps: { [key: string]: OverviewInfo } = {
    stack: {
      label: 'Built With',
    },
    website: {
      label: 'Website',
    },
    duration: {
      label: 'Duration',
    },
    tagline: {
      label: 'Tagline',
    },
    status: {
      label: 'Status',
    },
  }

  render() {
    const { title, years, html, key, ...overview } = get(
      this.props,
      'pageContext.project',
      {}
    )

    return (
      <MainContent>
        <>
          <ContentHeader>
            <ContentHeaderLabel>Projects</ContentHeaderLabel>
            <ContentHeaderTitle>{title || ''}</ContentHeaderTitle>
            <ContentHeaderYear>{years || ''}</ContentHeaderYear>
          </ContentHeader>
          <ContentOverview>
            <h2>Quick Facts</h2>
            <ContentOverviewList>
              {map(overview, (value, key) => (
                <ContentOverviewListItem>
                  <ContentOverviewListItemLabel>
                    {get(this.overviewProps, `${key}.label`, '')}
                  </ContentOverviewListItemLabel>
                  {key === 'website' ? (
                    <a href={value} target="_blank">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </ContentOverviewListItem>
              ))}
            </ContentOverviewList>
          </ContentOverview>
          <ContentBody dangerouslySetInnerHTML={{ __html: html || '' }} />
        </>
      </MainContent>
    )
  }
}

export default ProjectsContent
