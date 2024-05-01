require("../models/database");
const categorySchema = require("../models/Category");

exports.homepage = async (req, res) => {

    const limitNumber = 5;
    const categories = await categorySchema.find().limit(limitNumber);

    try {
        res.render("index", {
            title: "Cooking Blog - Kiero",
            categories
        })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

exports.exploreCategories = async (req, res) => {

    const categories = await categorySchema.find();

    try {
        res.render("categories", {
            title: "Cooking Blog - Categories",
            categories
        })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

