/// <reference path="..\typings\main.d.ts" />

import * as http from "http";
import * as fs from "fs";
import {ServerResponse} from "http";
import {ServerRequest} from "http";
var _ = require("underscore");
var s = require("underscore.string");

// on web request
function onRequest(request:ServerRequest, response:ServerResponse) {
    console.log(request.url);

    var urlObj = s(request.url).trim("/");
    var url = urlObj.value();
    if(_.isEmpty(url)){
        url = "index.html";
    }

    console.log("request file " + url);

    fs.readFile("./public/" + url, function(error, content) {
        if (error) {
            response.writeHead(500);
            response.end("Error", "utf-8");
        }
        else {
            var contentType = 'text/html';
            if(s(url).endsWith(".css")){
                contentType = 'text/css';
            }else if (s(url).endsWith(".js")){
                contentType = "application/javascript";
            }

            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}

http.createServer(onRequest).listen(8888);