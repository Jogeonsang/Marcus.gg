import React from 'react';
import { ThemeProvider } from 'styled-components';
import { HashRouter as Router } from 'react-router-dom';

import GlobalStyles from "./Styles/GlobalStyles";
import Theme from './Styles/Theme';
import Routes from "./Components/Routes";

const App = () => {
  return (
      <ThemeProvider theme={Theme}>
        <GlobalStyles/>
        <Router>
            <Routes/>
        </Router>
      </ThemeProvider>
  )
}

export default App;
