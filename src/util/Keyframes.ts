import { keyframes } from "styled-components";

export const Keyframes = {
  fadeIn: keyframes`
    from {
      opacity: 0;
      transform: translateX(2px);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  `,
  fadeInUp: keyframes`
    from {
      opacity: 0;
      transform: translateY(4px);
    }

    to {
      transform: translateX(0);
    }
  `,
};
