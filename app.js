/// <reference path="..\typings\main.d.ts" />
"use strict";
var http = require("http");
var fs = require("fs");
var _ = require("underscore");
var s = require("underscore.string");
// on web request
function onRequest(request, response) {
    console.log(request.url);
    var url = s.trim(request.url, "/");
    if (_.isEmpty(url)) {
        url = "index.html";
    }
    console.log("request file " + url);
    fs.readFile("./public/" + url, function (error, content) {
        if (error) {
            response.writeHead(500);
            response.end("Error", "utf-8");
        }
        else {
            var contentType = 'text/html';
            if (s.endsWith(url, ".css")) {
                contentType = 'text/css';
            }
            else if (s.endsWith(url, ".js")) {
                contentType = "application/javascript";
            }
            // oka: Ugly Workaround cause of this crappy server. He simply does not support query params =)
            if (contentType != "text/html") {
                url = s.contains(url, "?") ? url.split('?')[0] : url;
            }
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
}
http.createServer(onRequest).listen(8888);
