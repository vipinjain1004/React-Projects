
import React from 'react';
import ReactDOM from 'react-dom';
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Provider} from 'react-redux';
import store from './store/ReduxAuthentication'

import "./index.css";
import App from "./App";
//const root = ReactDOM(document.getElementById('root'));
//root.render(<App/>);
ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));



