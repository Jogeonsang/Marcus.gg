import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './home';
import Navigation from "../components/navigation";
import Summoner from './summonerSearch';

const Routes = () => [
    <>
        <Navigation key={1}/>
        <PrviateRoutes key={2}/>
    </>
]

const PrviateRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/summoner" component={Summoner}/>

    </Switch>
);


export default Routes;
