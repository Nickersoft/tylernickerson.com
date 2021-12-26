import React from "react";
import styled from "styled-components";

import { Testimonial } from "@site/components";
import { breakpoint, Colors } from "@site/util";

const TestimonialsContainer = styled.div`
  overflow: scroll;
  width: 100%;
  padding: 2.5rem 1rem;
  margin: 0;
  position: relative;

  ${breakpoint.tablet`
    margin: 0 -2.5rem;
    width: calc(100% + 2rem);
    padding: 2.5rem;
  `}
`;

const TestimonialOverlay = styled.div`
  position: relative;
  overflow: visible;
  display: block;

  ${breakpoint.tablet`
    &:before {
      position: absolute;
      content: "";
      width: 2.5rem;
      height: 100%;
      display: block;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0), #fbfbfb);
      right: 0;
      top: 0;
      z-index: 100;
    }  
  `}
`;

const Testimonials = styled.div<{ justifyContent: string }>`
  display: flex;
  flex-direction: column;
  justify-content: start;
  position: relative;

  ${breakpoint.tablet`
    flex-direction: row;
    justify-content: ${({ justifyContent }: { justifyContent: string }) =>
      justifyContent};
  `}
`;

const TestimonialsHeader = styled.div`
  text-align: center;
  position: relative;
  margin: 0 auto;

  span {
    position: relative;
    background: #fbfbfb;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.7rem;
    letter-spacing: 2px;
    padding: 0 1rem;
    color: ${Colors.mediumGray};
    z-index: 10;
  }

  &:before {
    content: "";
    height: 1px;
    width: 100%;
    left: 0;
    top: 50%;
    background: ${Colors.lightGray};
    position: absolute;
  }
`;

interface Props {
  testimonials: {
    color: string;
    name: string;
    title: string;
    image: string;
    text: string;
  }[];
}

const ExperienceTestimonials: React.FunctionComponent<Props> = ({
  testimonials,
}) => (
  <>
    <TestimonialsHeader>
      <span>Testimonials</span>
    </TestimonialsHeader>
    <TestimonialOverlay>
      <TestimonialsContainer>
        <Testimonials
          justifyContent={testimonials?.length > 1 ? "flex-start" : "center"}
        >
          {testimonials?.map(({ name, title, color, image, text }) => (
            <Testimonial
              key={name}
              name={name}
              color={color}
              title={title}
              image={image}
              text={text}
            />
          ))}
        </Testimonials>
      </TestimonialsContainer>
    </TestimonialOverlay>
  </>
);

export default ExperienceTestimonials;
