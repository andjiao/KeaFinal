<script>
  import Signup from "./pages/signup.svelte";
  import Login from "./pages/login.svelte";
  import Recipes from "./pages/recipeS.svelte";
  import Recipe from "./pages/recipe.svelte";
  import MyProfile from "./pages/myProfile.svelte";
  import MyLists from "./pages/myLists.svelte";
  import CreateRecipe from "./pages/recipeForm.svelte";
 
 
  import NavBar from "./components/Navbar.svelte";
  import { Route, Router } from 'svelte-navigator'
  
  

  </script>
  
  <main>
    <Router>
      <NavBar></NavBar>
        <Route path="/"> <Recipes/> </Route>
        <Route primary={false} path="/recipes/:id"> <Recipe/></Route>

        <Route path="/login"> <Login /> </Route>
        <Route path="/signup"> <Signup /> </Route>
      
        <Route path="/myProfile"> <MyProfile/> </Route>
        <Route path="/myLists"> <MyLists/> </Route>
        <Route path="/createRecipe"> <CreateRecipe/> </Route>
    </Router>
  
  </main>

 