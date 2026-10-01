declare module "scrolly-video/dist/ScrollyVideo.esm.jsx" {
  import type { ComponentType } from "react";
  const ScrollyVideo: ComponentType<{
    src: string;
    cover?: boolean;
    sticky?: boolean;
    full?: boolean;
    trackScroll?: boolean;
    lockScroll?: boolean;
    transitionSpeed?: number;
    frameThreshold?: number;
    useWebCodecs?: boolean;
    videoPercentage?: number;
    debug?: boolean;
  }>;
  export default ScrollyVideo;
}
