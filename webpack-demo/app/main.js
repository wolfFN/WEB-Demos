//main.js

import './main.less';

// let greeter = require('./Greeter.js');

import Greeter from './Greeter';
document.getElementById('root').appendChild(Greeter());


let str = 'hello es6';
for (var i of str){
    console.log(i);
}