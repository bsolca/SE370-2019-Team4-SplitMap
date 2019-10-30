import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import MapsList from './components/MapsList/MapsList'
import {MapComp} from "./components/Map/Map";
import {Sidebar} from "./components/sidebar/sidebar";
import {Layout} from "antd";

const Routes: React.SFC = () => {
    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route path="/map" component={MapComp} />
                <Route path="/" component={MapsList} />
            </Switch>
        </Router>
    );
};

export default Routes;
