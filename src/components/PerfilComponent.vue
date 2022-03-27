<template>  
    <div id="pefil">
        <div>
        <b-navbar toggleable type="dark" variant="dark">
            <b-navbar-brand id="titulo">nombre</b-navbar-brand>
            <b-navbar-toggle target="navbar-toggle-collapse">
                <template #default="{ expanded }" >
                    <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                    <b-icon v-else icon="chevron-bar-down"></b-icon>
                </template>
            </b-navbar-toggle>
            <b-collapse id="navbar-toggle-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="colaps" href="#">Editar Perfil</b-nav-item>
                    <b-nav-item class="colaps" to="/logup">Salir</b-nav-item>                    
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
        <div class="container-perfil">
            <div class="portada">

            </div>
            <div class="photo_perfil">
                
            </div>            
            
            <postComponent class="post"></postComponent>  
            <div class="friends">
                <h1>fiends</h1>                
            </div>              
        </div>        
    </div>    
</template>


<script>

import postComponent from './PostComponent.vue'


export default {
    name: 'perfilComponent',
    components: {
        postComponent 
        
    }
}
</script>

<style scoped>

    .navbar-toggler {
        margin-right: 2%
    }

    #pefil{
        width: 100%;
        position: absolute;        
        z-index: 10000;        
        margin-top: -50px;        
        width: 100%;        
    }

    .colaps{
        margin-left:20px;
    }
    #titulo{
        margin-left: 2%;
    }

    .container-perfil{
        display: grid;
        grid-template-areas: 
        "a a a a" 
        "f f f f"
        "c c c c"
        "c c c c"       
        ;
    }

    .portada{
        grid-area: a;
        width: 100%;
        height: 200px;
        background-color: aqua;
    }

    .photo_perfil{   
        position: absolute;        
        background: red;
        border-radius: 50%;
        height: 200px;
        width: 200px;
        justify-self: center;
        margin-top: 60px;
        
        
    }
    .post{
        grid-area: c;
        margin-top: 10%;
        height: auto;
        width: 80%;
        justify-self: center;
        border: 1px solid red;        
    }

    .friends{
        grid-area: f; 
        border: 1px solid red;
        margin-top: 20%;
        justify-self: center;
    }

    @media (min-width: 1164px){
    .container-perfil{
        display: grid;
        grid-template-areas: 
        "a a a a" 
        "f c c c"
        "f c c c"
        "f c c c"       
        ;
    }
    

    }

</style>