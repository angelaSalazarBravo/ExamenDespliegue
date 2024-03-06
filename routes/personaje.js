var express = require("express");
var router = express.Router();
var Personaje = require("../models/personaje");

router.get("/", function (req, res) {
  res.redirect("/personaje/mosaico");
});

router.get("/personaje", function (req, res) {
  res.redirect("/personaje/mosaico");
});

router.get("/personaje/mosaico", async (req, res) => {
  try {
    const personajes = await Personaje.find({}, "id name");
    res.render("mosaico", { personajes });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/personaje/mosaico", async (req, res) => {
  const { id } = req.params;
  try {
    const personaje = await Personaje.find({ id: id });
    let fecha = new Date(personaje.created);
    fecha = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    personaje.created = fecha;
    if (personaje.gender == "Male") {
      personaje.gender = "Masculino";
    } else if (personaje.gender == "Female") {
      personaje.gender = "Femenino";
    } else {
      personaje.gender = "Bicho raro";
    }
    res.render("personaje", { personaje });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// listado

router.get("/personaje/listado", async (req, res) => {
  try {
    const personajes = await Personaje.find({}, "id name");
    res.render("listado", { personajes });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/personaje/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const personaje = await Personaje.find({ id: id });
    let fecha = new Date(personaje[0].created);
    fecha = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear();
    personaje[0].created = fecha;
    if (personaje[0].gender == "Male") {
      personaje[0].gender = "Masculino";
    } else if (personaje[0].gender == "Female") {
      personaje[0].gender = "Femenino";
    } else {
      personaje[0].gender = "Bicho raro";
    }
    res.render("personaje", { personaje });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
