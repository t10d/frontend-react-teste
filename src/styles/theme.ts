import { extendTheme } from "@chakra-ui/react";

const customTheme = {
  colors: {
    primary: "#fecc7f",
    secondary: "#46cbb1",
    tertiary: "#a4552c",
    text: "#3c424c",
  },
};

const theme = extendTheme(customTheme);

export default theme;
