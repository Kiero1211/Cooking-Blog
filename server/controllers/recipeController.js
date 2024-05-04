require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/*
    App Routes
*/
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



/*
    GET /categories
    Categories
*/
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

exports.exploreCategoriesById = async (req, res) => {
    const categoryName = req.params.name;

    const recipeList = await Recipe.find({ category: categoryName });
    try {
        res.render("categories", {
            title: "Cooking Blog - Categories",
            recipeList,
            categoryName
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}


/*
    GET /recipes
    Recipes
*/
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

/*
    POST /search
    Search
*/
exports.search = async (req, res) => {
    try {
        const term = req.body.searchTerm;
        const resultRecipes = await Recipe.find({ $text: { $search: term, $diacriticSensitive: true } });
        res.render("search", {
            title: "Cooking Blog - Search",
            resultRecipes
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

/*
    GET /explore-latest
    Latest Recipes
*/
exports.exploreLatest = async (req, res) => {
    try {
        const limitNumber = 20;
        const resultRecipes = await Recipe.find().sort({_id: -1}).limit(limitNumber);
        res.render("latest", {
            title: "Cooking Blog - Latest Results",
            resultRecipes
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}


/*
    GET /explore-random
    Random Recipes
*/
exports.exploreRandom = async (req, res) => {
    try {
        const count = await Recipe.find().countDocuments();
        const randomNumber = Math.floor(Math.random() * count)
        const resultRecipe = await Recipe.findOne().skip(randomNumber);
        console.log(resultRecipe);
        res.render("random", {
            title: "Cooking Blog - Random Result",
            recipe: resultRecipe
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}
