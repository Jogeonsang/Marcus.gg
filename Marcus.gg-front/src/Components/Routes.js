import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Navigation from "./Navigation";

const Routes = () => [
    <>
        <Navigation key={1}/>
        <PrviateRoutes key={2}/>
    </>
]

const PrviateRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
    </Switch>
);


export default Routes;
