import presetEnv from "postcss-preset-env";
import nested from "postcss-nested";

export default {
  plugins: [presetEnv(), nested()],
};
