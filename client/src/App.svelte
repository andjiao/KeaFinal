<script>
  import Signup from "./pages/signup.svelte";
  import Login from "./pages/login.svelte";
  import Recipes from "./pages/recipeS.svelte";
  import RecipeDetails from "./pages/recipeDetails.svelte";
  import MyProfile from "./pages/myProfile.svelte";
  import MyLists from "./pages/myLists.svelte";
  import CreateRecipe from "./pages/recipeForm.svelte"; 

 
  import NavBar from "./components/Navbar.svelte";
  import { Route, Router } from 'svelte-navigator'
  
  </script>
  
  <main>
    <Router>
      <NavBar></NavBar>
        <Route path="/" primary={false}> <Recipes/> </Route>
        <Route path="/recipeDetails/:id"> <RecipeDetails/> </Route>
        <Route path="/login"> <Login /> </Route>
        <Route path="/signup"> <Signup /> </Route>
        <Route path="/myProfile"> <MyProfile/> </Route>
        <Route path="/myLists"> <MyLists/> </Route>
        <Route path="/createRecipe"> <CreateRecipe/> </Route>
    </Router>
  
  </main>

 