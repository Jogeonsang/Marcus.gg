import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
${reset};
a{
    text-decoration: none;
    color: inherit;
}

*{
    box-sizing: border-box;
}

body {
    font-family: font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size:12px;
    background-color: #151E33;
    color: #3a3d42;
}
`;

export default globalStyles;
