import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import packageJson from "./package.json";

export default {
  input: "./src/index.ts",
  external: ["react", "react-dom"],
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onwarn: (warning) => {
    // should intercept ... but doesn't in some rollup versions
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }
    // console.warn everything else
    console.warn(warning.message);
  },
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    postcss({
      use: ["sass"],
      plugins: [],
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: "**/__tests__/**",
      clean: true,
    }),
  ],
};
