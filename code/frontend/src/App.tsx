import React from 'react';
import './App.scss';
import {Layout} from 'antd';
import MapsList from './components/MapsList/MapsList'
import {useRoutes} from "hookrouter";
import {Sidebar} from "./components/sidebar/sidebar";
import Map from "./components/Map/Map";
import Test from "./components/test/Test";

const routes = {
    '/': () => <MapsList/>,
    '/test': () => (product:any) => <Test product={product} />,
    '/map/:id/:name/:size_width/:size_height': ({id, name, size_width, size_height}: any) => <Map id={id} name={name}
                                                                                                   size_width={size_width}
                                                                                                   size_height={size_height}/>,
};

function App() {
    const routeResult = useRoutes(routes);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sidebar/>
            {routeResult}
        </Layout>
    )
}

export default App;
