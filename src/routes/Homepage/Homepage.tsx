import React, { Component } from "react";

import { graphql } from "gatsby";
import { map, flow, find, get } from "lodash/fp";

import tw from "twin.macro";

import ProjectPreview from "./HomepageProjectPreview";
import AnimatedHeader from "./HomepageAnimatedHeader";
import IconGrid from "./HomepageIconGrid";

type Props = {
  location: Location;
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        page: string;
      };
      html: string;
    };
  };
};

class Homepage extends Component<Props> {
  getProjectPreview(id: string) {
    const data = flow(
      get("data.allMarkdownRemark.edges"),
      map("node"),
      find(["frontmatter.id", id])
    )(this.props);

    const frontmatter = get("frontmatter")(data);
    const title = get("title")(frontmatter);
    const tagline = get("tagline")(frontmatter);
    const duration = get("duration")(frontmatter);
    const website = get("website")(frontmatter);
    const link = get("link")(frontmatter);
    const html = get("html")(data);

    return (
      <ProjectPreview
        key={id}
        title={title}
        link={link}
        id={id}
        website={website}
        duration={duration}
        tagline={tagline}
        html={html}
      />
    );
  }

  render() {
    let hash = "";

    if (typeof location !== "undefined") {
      hash = get("hash")(location).substr(1);
    }

    const renderPreview = hash.trim().length > 0;

    return (
      <div tw="absolute h-full items-center bg-red flex flex-row justify-center">
        {renderPreview ? this.getProjectPreview(hash) : <AnimatedHeader />}
        <IconGrid selectedIcon={hash || ""} />
      </div>
    );
  }
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/preview/" } }) {
      edges {
        node {
          frontmatter {
            title
            id
            website
            duration
            tagline
            link
          }
          html
        }
      }
    }
  }
`;

export default Homepage;
