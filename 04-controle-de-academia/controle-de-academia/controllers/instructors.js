const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");
const Intl = require("intl");

// INDEX
exports.index = function(req, res) {
    return res.render("instructors/index", { instructors: data.instructors });
}

// CREATE
exports.create = function(req, res) {
    return res.render("instructors/create");
}

// POST
exports.post = function (req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!");
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = Number(data.instructors.length + 1);

    data.instructors.push({ id, name, avatar_url, birth, gender, services, created_at});

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) return res.send("Write file error!");

        return res.redirect(`/instructors/${id}`);
    });
}

// SHOW
exports.show = function(req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id;
    });

    if (!foundInstructor) {
        return res.send("Instructor not found!");
    }

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    };

    return res.render("instructors/show", { instructor: instructor });
}

// EDIT
exports.edit = function(req, res) {
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function(instructor) {
        return instructor.id == id;
    });

    if (!foundInstructor) {
        return res.send("Instructor not found!");
    }
    
    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render("instructors/edit", {instructor});
}

// PUT
exports.put = function(req, res) {
    const { id } = req.body;
    let index = 0;

    const foundInstructor = data.instructors.find(function(instructor, foundIndex) {
        if (id == instructor.id) {
            index = foundIndex;
            return true;
        }
    });

    if (!foundInstructor) {
        return res.send("Instructor not found!");
    }

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if (err) {
            return res.send("Write file error!");
        }

        return res.redirect(`/instructors/${id}`);
    });
}

// DELETE
exports.delete = function(req, res) {
    const {id} = req.body;

    const filteredInstructors = data.instructors.filter(function(instructor) {
        return instructor.id != id;
    });

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) {
            return res.send("Write file error!");
        }
        
        return res.redirect("/instructors");
    });
}