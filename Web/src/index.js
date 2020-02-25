import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Textbox from "./Pmodal";
import * as serviceWorker from './serviceWorker';
import Intro from "./Introduction";
import Inro from './Introduction';
import Pmodal from "./Pmodal";
// const {} = antd;




ReactDOM.render(
            <Intro />, document.getElementById('root')
            );

// ReactDOM.render(
//     <Pmodal buttonlabel="获取下载链接" classname="primary"/>, document.getElementById('pmodal')
// );




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
