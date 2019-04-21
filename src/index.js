import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Game/Game.css';
import App from './App';
//import Game from './Game/Game';
import Game2 from './Game/Game2';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Game2 />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
