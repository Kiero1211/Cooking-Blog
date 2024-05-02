require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

exports.homepage = async (req, res) => {

    const limitNumber = 5;
    const categories = await Category.find().limit(limitNumber);
    const Latest = await Recipe.find().sort({ "-id": -1 }).limit(limitNumber);
    const Thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const American = await Recipe.find({ category: "American" }).limit(limitNumber);
    const Chinese = await Recipe.find({ category: "Chinese" }).limit(limitNumber);
    const Italian = await Recipe.find({ category: "Italian" }).limit(limitNumber);
    const Mexican = await Recipe.find({ category: "Mexican" }).limit(limitNumber);
    const Indian = await Recipe.find({ category: "Indian" }).limit(limitNumber);

    const recipes = {
        Latest,
        Thai,
        American,
        Chinese,
        Italian,
        Mexican,
        Indian
    };
    try {
        res.render("index", {
            title: "Cooking Blog - Kiero",
            categories,
            recipes
        })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

exports.exploreCategories = async (req, res) => {
    const categories = await Category.find();

    try {
        res.render("categories", {
            title: "Cooking Blog - Categories",
            categories
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

exports.exploreRecipe = async (req, res) => {
    const requestedId = req.params.id;

    const recipe = await Recipe.findById(requestedId);
    try {
        res.render("recipe", {
            title: "Cooking Blog - Recipe",
            recipe
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

