const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");


router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);
router.get("/recipe/:id", recipeController.exploreRecipe);
router.get("/categories/:name", recipeController.exploreCategoriesById);
router.get("/explore-latest", recipeController.exploreLatest);
router.get("/explore-random", recipeController.exploreRandom);
router.post("/search", recipeController.search);

module.exports = router;