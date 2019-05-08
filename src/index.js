import React from 'react';
import ReactDOM from 'react-dom';

// import jQuery from 'jquery';
// import './index.css';
// import './Game/Game.css';
// import App from './App';
// import Game from './Game/Game';
// import Game2 from './component/Game/Game2';
import App from './component/todolist/App';
// import App from './component/todoexample/App';
import * as serviceWorker from './serviceWorker';

// window.$ = window.jQuery = jQuery;
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
