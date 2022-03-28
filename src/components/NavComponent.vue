<template>
    <div id="navComponet">        
            <b-navbar type="dark" variant="dark" class="ml-auto" id="navlogin">
                <b-navbar-nav class="items">
                    <b-nav-item active ><router-link to="/logup">Registrate</router-link></b-nav-item>
                    <b-nav-item active ><router-link to="/login">Ingresa</router-link></b-nav-item>                    
                </b-navbar-nav>
            </b-navbar> 
        <router-view/>           
    </div>
</template>

<script>
// @ is an alias to /src
export default {
    name: 'navComponent',
    components: {
    
    }
}
</script>

<style scoped>

    .ml-auto{       
        justify-content: end;         
    }

    .items{
        margin-right: 10%;
        column-gap: 20px;
    }

    a{
        text-decoration: none;
        color: white;        
        
    } 

    
</style>