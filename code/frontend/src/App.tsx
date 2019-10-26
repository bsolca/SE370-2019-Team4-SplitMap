import React from 'react';
import './App.css';
import { Sidebar } from './components/sidebar/sidebar'
import { MapsList } from './components/MapsList/MapsList'
import { Layout } from 'antd';

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar/>
      <MapsList/>
    </Layout>
  );
}

export default App;
