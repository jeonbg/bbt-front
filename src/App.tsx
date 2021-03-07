import React from 'react';
import { BrowserRouter as Routes } from 'react-router-dom';
import RouteContainer from './routes/RouteContainer';
import GlobalStyle from '../src/styles/globalStyle';

function App() {
  return (
    <Routes>
      <GlobalStyle />
      <RouteContainer />
    </Routes>
  );
}

export default App;
