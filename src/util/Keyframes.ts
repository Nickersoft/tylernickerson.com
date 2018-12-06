import { keyframes } from 'styled-components'

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
}
