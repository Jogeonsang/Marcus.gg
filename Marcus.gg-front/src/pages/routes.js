import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Navigation from "../Components/Navigation";
import Summoner from './SummonerSearch';

const onEnterDefault = () => {

}

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

        <Route path="*" onEnter={onEnterDefault} />
    </Switch>
);


export default Routes;
