import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import New from './components/new';
import Edit from './components/edit';
import * as serviceWorker from './serviceWorker';

import FormStore from "./store/FormStore"
const NewFormStore = new FormStore();
const EditFormStore = new FormStore();

const App = () => (
  <div className="app-container">
    <New store={NewFormStore}/>
    <Edit store={EditFormStore}/>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
