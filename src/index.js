import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Mock from './mock';
Mock.doMock();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
