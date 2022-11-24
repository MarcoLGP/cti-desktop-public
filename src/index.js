import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/App'
import Login from './login_window/Login'
import { HashRouter } from 'react-router-dom';
import './main/Routs'
import { Provider } from 'react-redux';
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Login />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);