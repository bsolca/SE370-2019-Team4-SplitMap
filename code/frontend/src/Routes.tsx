import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom"

import MapsList from './components/MapsList/MapsList'

const Routes: React.SFC = () => {
    return (
        <Router>
            <div>
                <Route path="/" component={MapsList} />
            </div>
        </Router>
    );
};

export default Routes;
