const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
});

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars.githubusercontent.com/u/68706541?s=460&u=f52ad94b88f37d3929d4fa05cea1ea90075e4c53&v=4",
        name: "William Fernandes",
        role: "Full Stack Developer",
        description: 'Estudando programação web pela <a href="https://rocketseat.com.br" target="_blank" > Rocketseat</a>',
        links: [
            { name: "Github", url: "https://github.com/williamfernands" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/williamfernands/" }
        ]
    };

    return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
    const id = req.query.id;
    const video = videos.find(function (video) {

        return video.id === id;
    });

    if (!video) {
        return res.send("Video not found!");
    }

    return res.render("video", { item: video });
});

server.listen(5000, function () {
    console.log("Server is running");
});