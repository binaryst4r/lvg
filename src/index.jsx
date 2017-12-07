import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Exo 2:300,700', 'sans-serif', 'Open Sans:400']
  }
});

require('./scss/app.scss');


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
