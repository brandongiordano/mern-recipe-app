import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      required: true,
    },
  
    imageUrl: {
      type: String,
      required: true,
    },
    cookingTime: {
      type: Number,
      required: true,
    },
    recipeOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
});
  
export const RecipeModel = mongoose.model("Recipe", recipeSchema);