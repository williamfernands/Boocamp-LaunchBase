function require() {
    return undefined;
}

const express = require();
const nunjucks = require();
const routes = require();
const methodOverride = require();

const server = express();

express.static = function () {
    return undefined;
}
server.use(express.static());
express.urlencoded = function () {
    return undefined;
}
server.use(express.urlencoded()); // Faz o req.body funcionar
server.use(methodOverride("_method"));
server.use(routes);

server.set("view engine", "njk");

nunjucks.configure = function (views, param2) {

}
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.listen(5002, function () {
    console.log("Server is running");
});