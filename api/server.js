const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Get the database URI from an environment variable
const DB_URI =
  "mongodb+srv://TestingUser:7tkVfUi58eAW2tAc@cluster0.60nsjvd.mongodb.net/?retryWrites=true&w=majority";

// Database connection
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const recipe = require("./models/recipes");

app.options("/recipes/new", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.status(200).send();
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await recipe.find();
    res.json(recipes);
  } catch (error) {
    // Add error handling for database errors
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/recipes/new", async (req, res) => {
  try {
    const newRecipe = new recipe({
      favorite: req.body.favorite,
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      image: req.body.image,
    });
    await newRecipe.save();
    res.json(newRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/recipes/delete/:id", async (req, res) => {
  try {
    const deletedRecipe = await recipe.findByIdAndDelete(req.params.id);
    res.json(deletedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/recipes/update/:id", async (req, res) => {
  try {
    const updatedRecipe = await recipe.findById(req.params.id);
    updatedRecipe.favorite = !updatedRecipe.favorite;
    await updatedRecipe.save();
    res.json(updatedRecipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/recipes/search/:query", async (req, res) => {
  try {
    const recipes = await recipe.find({
      $or: [
        { name: { $regex: req.params.query, $options: "i" } },
        { description: { $regex: req.params.query, $options: "i" } },
        { ingredients: { $regex: req.params.query, $options: "i" } },
      ],
    });
    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Use the port number specified by Render
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
