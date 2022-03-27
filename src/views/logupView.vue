<template>
  <div class="login-form"> 
      <h2>Registrate</h2>    
      <b-form inline>
        <label class="sr-only" for="inline-form-input-name">Email</label>
        <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Jane Doe"
        ></b-form-input>
        </b-input-group>

        <label class="sr-only" for="inline-form-input-name">Nombre</label>
        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-form-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Jane Doe"
        ></b-form-input>
        </b-input-group>
        

        <label class="sr-only" for="inline-form-input-username">Password</label>        
        <b-form-input id="inline-form-input-username" placeholder="Password" type="password"></b-form-input>
        <b-button id="button">Ingresar</b-button>
      </b-form>
</div>  
</template>

<style scoped>
  .login-form{
    display: grid;    
    justify-content: center;
    justify-items: center;
    margin-top: 10%;    
  }
  #button{
    margin-top: 5%;
    width: 100%;
  }
</style>




<script>
// @ is an alias to /src

export default {
  name: 'logupView',
  components: {
    
  }
}
</script>
