import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';

const Routes = () => [
    <PrviateRoutes key={2} />,
]

const PrviateRoutes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
    </Switch>
);


export default Routes;
