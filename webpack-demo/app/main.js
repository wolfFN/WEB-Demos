//main.js

import './main.css';

let greeter = require('./Greeter.js');
document.getElementById('root').appendChild(greeter());


let str = 'hello es6';
for (var i of str){
    console.log(i);
}