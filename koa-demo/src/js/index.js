import '../css/index.css';
import React from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import {Main, About, Detail} from './component.jsx';

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={Main}/>
            <Route exact path="/views/index.html" component={Main}/>
            <Route path="/about" component={About}/>
            <Route path="/detail/:key" component={Detail}/>
        </div>
    </Router>
), document.getElementById('main'));

console.log('index.js successfully loaded!');
