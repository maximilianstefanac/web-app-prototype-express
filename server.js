const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");

const app = express();
const port = 8080;

const sequelize = new Sequelize(
    "geoapp",
    "geoapp",
    "Welcome1!",
    {
    host: "localhost",
    dialect: "postgres"
});

class Tree extends Model {}

Tree.init({
    treeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    species: DataTypes.STRING,
    position: DataTypes.GEOMETRY("POINT",4326)
}, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    tableName: "tree"
});

sequelize.sync();

/*
Geospatial querries with Sequelize : use "Raw Query"
https://sequelize.org/master/manual/raw-queries.html
-> specify model when just returning fields of an entity / model
-> mapToModel: True
*/

app.get('/trees', (req, res) => {
    Tree.findAll().then((trees) => {
        res.send(trees);
    });
});

app.listen(port, () => {
    console.log(`App is listening on Port ${port}`);
});