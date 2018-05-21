import http from 'http';
import express from "express";
import config from './config';
import api from './api';

let app = express();
let server = http.createServer(app);

api(app);
server.listen(config.get('server:port'), () => {
    console.log('Running on localhost:' + config.get('server:port'))
});

module.exports = server;