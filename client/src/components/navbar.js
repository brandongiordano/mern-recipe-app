import { Link } from 'react-router-dom';

export const Navbar = () => {
    return <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/createRecipe">Create</Link>
        <Link to="/savedRecipes">My Recipes</Link>
        <Link to="/auth">Login/Signup</Link>
    </div>
}