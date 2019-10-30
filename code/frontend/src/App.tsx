import React from 'react';
import './App.css';
import { Sidebar } from './components/sidebar/sidebar'
import { Layout } from 'antd';
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Routes />
    </Layout>
  );
};

export default App;
