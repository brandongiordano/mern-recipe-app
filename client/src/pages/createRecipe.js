import React, { useState } from "react"
import axios from "axios";
import { getUserID } from "../utils/getUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {

    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"]);
    const userID = getUserID;

    // State variables
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        recipeOwner: userID,
    });

    // State change handler functions
    const handleChange = (event) => {
        const {name, value} = event.target;
        setRecipe({...recipe, [name]: value});
    }

    // Handler for ingredients
    const handleIngredientChange = (event, index) => {
        const {value} = event.target;
        const ingredients = [...recipe.ingredients];
        ingredients[index] = value;
        setRecipe({...recipe, ingredients});
    }

    // Event handler to add another ingredient to the recipe
    const addIngredient = () => {
        const ingredients = [...recipe.ingredients, ""];
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""]});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          await axios.post(
            "http://localhost:3001/recipes",
            { ...recipe },
            {
              headers: { authorization: cookies.access_token },
            }
          );
    
          alert("Recipe Created");
          navigate("/");
        } catch (error) {
          console.error('something went wrong', error);
        }
    };

    return (
        <div className="createRecipe">
            <h2>Create a Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={recipe.name}
                    onChange={handleChange}/>
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient,index) => (
                    <input 
                        key={index} 
                        type="text" 
                        name="ingredients" 
                        value={ingredient} 
                        onChange={(event) => handleIngredientChange(event, index)}/>
                ))}
                <button onClick={addIngredient} type="button">Add Ingredient</button>
                <label htmlFor="instruction">Instructions</label>
                <textarea 
                    id="instructions" 
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChange}></textarea>
                <label htmlFor="imageUrl">Image</label>
                <input 
                    type="text" 
                    placeholder="Copy in the image URL" 
                    id="imageUrl" 
                    name="imageUrl"
                    value={recipe.imageUrl}
                    onChange={handleChange} />
                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input 
                    type="number" 
                    id="cookingTime" 
                    name="cookingTime"
                    value={recipe.cookingTime}
                    onChange={handleChange} />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    )
}