import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  *:focus {
    outline: 0;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;

  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  html, body, #root {
    min-height: 100vh;
  }
`;
