import React from 'react';
import './App.scss';
import {Layout} from 'antd';
import Routes from "./Routes";

const App: React.FC = () => {
    console.log("App is HERE");
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Routes/>
        </Layout>
    );
};

export default App;
