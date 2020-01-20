import React from 'react';
import {ThemeProvider} from 'styled-components';
import {HashRouter as Router} from 'react-router-dom';

import GlobalStyles from "./styles/GlobalStyles";
import Theme from './styles/Theme';
import Routes from "./pages/routes";
import ChampionContextProvider from "./commons/context";

const App = () => {
  return (
    <ChampionContextProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyles/>
        <Router>
          <Routes/>
        </Router>
      </ThemeProvider>
    </ChampionContextProvider>
  )
}

export default App;
