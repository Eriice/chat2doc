import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const 使用_应用尺寸 = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const 是否手机 = breakpoints.smaller("sm");
  return { 是否手机 };
};

export default 使用_应用尺寸;
