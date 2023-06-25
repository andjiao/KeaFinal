<script>
  import { Link, useNavigate } from 'svelte-navigator'
  import {BASE_URL} from '../store/globals.js'

  import { user } from '../store/getUser.js'

  import * as Toastr from 'toastr'

  const navigate = useNavigate()


  async function logout()  {
    try {
      const response = await fetch(`${$BASE_URL}/members/logout`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
    }
})

if(response.ok){
  user.set(null)
 localStorage.removeItem("user")  
navigate('/', {replace:true} )
      
} else {
  const json = await response.json()
Toastr.warning(json.message)
}

} catch {
Toastr.error('Could not logout.')
}
}

</script>
  <div class="nav">
    <input type="checkbox" id="nav-check">
  <div class="nav-header">
      <a class="nav-title" href="/"> Recipes</a>
    </div>

    <div class="nav-btn">
      <label for="nav-check">
        <span></span>
        <span></span>
        <span></span>
      </label>
    </div>

    <div class="nav-links"> 
    {#if !$user}
      <a class="nav-links" href="/signup">
        Signup
       </a>
       <a class="nav-links" href="/login">
         Login
       </a>
    {:else} 
      <a class="nav-links"href="/myProfile"> My Profile</a>
      <a  class="nav-links" href="/myLists">
        My lists
      </a>
      <a class="nav-links" href="/createRecipe">
        Create Recipes
      </a>
        <button class="nav-link" on:click={logout} >Logout</button>         
    {/if}
  </div> 
  
</div>
 
 

  
<style>
  * {
  box-sizing: border-box;
}

.nav {
  height: 50px;
  width: 100%;
  background-color: #F4A460;
  position: relative;
  z-index: 999;
}

.nav > .nav-header {
  display: inline;
}

.nav > .nav-header > .nav-title {
  display: inline-block;
  font-size: 22px;
  color: #663300;
  padding: 10px 10px 10px 10px;
  text-decoration: none;
}

.nav > .nav-btn {
  display: none;
}

.nav > .nav-links {
  display: inline;
  float: right;
  font-size: 18px;
}

.nav > .nav-links > a,button {
  display: inline-block;
  padding: 13px 10px 13px 10px;
  text-decoration: none;
  color: #663300;
}

.nav > .nav-links > a:hover{
  color: #99004D;
    border-bottom: 2px solid #99004D;
    padding-bottom: 8px;
}

.nav > #nav-check {
  display: none;
}

@media (max-width:600px) {
  .nav > .nav-btn {
    display: inline-block;
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .nav > .nav-btn > label {
    display: inline-block;
    width: 50px;
    height: 50px;
    padding: 13px;
  }
  .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > .nav-btn > label > span {
    display: block;
    width: 25px;
    height: 10px;
    border-top: 2px solid #eee;
  }
  .nav > .nav-links {
    position: absolute;
    display: block;
    width: 100%;
    background-color: #333;
    height: 0px;
    transition: all 0.3s ease-in;
    overflow-y: hidden;
    top: 50px;
    left: 0px;
  }
  .nav > .nav-links > a, button {
    display: block;
    width: 100%;
  }
 /*  .nav > #nav-check:not(:checked) ~ .nav-links {
    height: 0px;
  }
  .nav > #nav-check:checked ~ .nav-links {
    height: calc(100vh - 50px);
    overflow-y: auto;
  } */
}
</style>
