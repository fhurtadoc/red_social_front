<template>  
    <div id="pefil">
        <div>
        <b-navbar toggleable type="dark" variant="dark">
            <b-navbar-brand id="titulo">{{user.nickname}}</b-navbar-brand>
            <b-navbar-toggle target="navbar-toggle-collapse">
                <template #default="{ expanded }" >
                    <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                    <b-icon v-else icon="chevron-bar-down"></b-icon>
                </template>
            </b-navbar-toggle>
            <b-collapse id="navbar-toggle-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item class="colaps" href="#">Editar Perfil</b-nav-item>
                    <b-nav-item class="colaps" v-on:click.prevent="salir" >Salir</b-nav-item>                    
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
        <div class="container-perfil">
            <div class="portada">
                    
            </div>                  
            <figure v-if="imagen" class="photo_perfil">
                    <img :src="`${url+'/static/perfil'+post.img}`">
            </figure> 
            <figure v-else class="photo_perfil">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png">
            </figure>                                                              
            <div class="post">
            <form @submit.prevent="create_post" class="form_post" >                
                <div class="form-group">                    
                    <input
                    type="text"
                    v-model="post.description"
                    placeholder="Que quieres compartir"
                    id="post_description"
                    name="post_description"
                    class="form-control"
                    :class="{ 'is-invalid': submitted && $v.post.descripcion.$error }"
                    />
                    <div
                    v-if="submitted && $v.post.descripcion.$error"
                    class="invalid-feedback"
                    >
                    <span v-if="!$v.post.descripcion.required">La descripcion es necesaria</span>                    
                    </div>
                </div>
                <div class="form-group">
                    <label for="img">Sube una Imagen</label>
                    <input
                    type="file"
                    @change="upload_file"
                    id="img"
                    name="img"
                    class="form-control"
                    accept=".jpg, .jpeg"                    
                    :class="{ 'is-invalid': submitted && $v.post.img.$error }"
                    />
                    <div
                    v-if="submitted && $v.post.img.$error"
                    class="invalid-feedback"
                    >
                    <span v-if="!$v.post.img.required">La imagen es Necesaria</span>                    
                    </div>
                    <p>solo se pueden subir imagenes en png o jpeg</p>                    
                    
                </div>
                <div class="form-group">
                    <button class="btn btn-secondary" >+</button>
                </div>
            </form>

                <h3>Lista de Post</h3>
                <!--si no tienen post-->
                <div v-if="posts.length==0">
                    <div class="col">
                        <div class="card shadow-sm">                            
                            <div class="card-body">
                            <figure>
                                <img src='' alt="post.img">
                            </figure>                            
                            <p class="card-text">No tienes ningun Post</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Eliminar</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
                                </div>                                
                            </div>
                            </div>
                        </div>
                    </div>                    
                </div>
                <div v-for="(post, index) in posts" :key="index"  >
                    <div class="col">
                        <div class="card shadow-sm">                            
                            <div class="card-body">
                            <figure v-if="post.img">
                                  <img :src="`${url+'/static/img_post/'+post.img}`">
                            </figure> 
                            <figure v-else>
                                <img src="https://plantillasdememes.com/img/plantillas/imagen-no-disponible01601774755.jpg">
                            </figure>                                                  
                            <p class="card-text">{{post.description}}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Eliminar</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Ver</button>
                                </div>
                                <small v-if="post.date" class="text-muted">{{post.date.slice(0, 19).replace('T', ' ')}}</small>                                
                            </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="friends">
                
                <div class="form-group" >
                    <label for="">Buscar Amigos por su Email</label><br>
                    <input type="text"  @keypress="friendsfindasync" v-model='email'>                    
                </div>
                <div class="continer_findfriends">
                    
                    <div v-if="find_fiends.length===0">
                        <span>Tu eres el unico en nuestra Red Social</span>
                    </div>
                    <div v-else>
                        <div v-for="(friend, index) in find_fiends" :key="index" id="continer_friends">
                            <div>
                                <span>nombre:{{friend.nickname}}</span>
                                <span>email:{{friend.email}}</span>                                
                                <button class="btn btn-light" >
                                    <b-icon icon="check-square" scale="2" variant="success" v-on:click.prevent="apply_friend(friend.id)"></b-icon>                                    
                                </button>                                
                                </div>                            
                        </div>
                    </div>

                </div>
                
            </div>              
        </div>        
    </div>    
</template>


<script>


import axios from 'axios';
import enviromentApi from '../../enviromentApi';
import { required, minLength} from "vuelidate/lib/validators";


export default {
    name: 'perfilComponent',
    validations:{
        post:{            
            description:{
                required,
                minLength:minLength(8)
            },            
        }
    },    
    data() {
    return {
            email:"",
            find_fiends:[],
            submitted: false,
            imagen:null,
            post: {
                id_user:"",
                description:"",
                img:""
            },
            user:{
                id:0,
                email:'',
                nickname:'',
                status:''
            }, 
            url:enviromentApi.URL,
            posts:Array
        }            
    },
    beforeCreate(){
        
        
    },
    created() {
        var user=localStorage.getItem('User');
        this.user=JSON.parse(user)        
        this.get_posts()

    },
    components: {
                
    },
    methods:{

        apply_friend(id){
            console.log(id);
        },
        salir(){
            //console.log('salir');
            localStorage.removeItem('User')
            localStorage.removeItem('Token')
            this.$router.push('/logup');
        },        
        get_posts(){
            axios({
                method:'post',
                url: this.url+'/post/list',
                data:{id_user:this.user.id},                                
            })
            .then((res)=>{
                this.posts=res.data;
                console.log(this.posts);
            })
            .catch((res)=>{
                console.log(res);
            })
        },
        getImgen(){
            
        },
        upload_file(e){
            let file=e.target.files;              
            if(!file){
                console.log("erro");
            }else{
                var extence=file[0].name.split('.');
                if(extence[1]==="png" || extence[1]==="jpg" || extence[1]==="jpeg"){
                    this.post.img=file[0]
                }else{
                    
                    alert("no se permite ese formato");
                }
            }
            
        },
        create_post(){
            this.submitted=true
            this.post.id_user=this.user.id
            let form_post=new FormData()
            form_post.append('description', this.post.description)
            form_post.append('img', this.post.img)
            form_post.append('id_user', this.user.id)            
            form_post.append('date', new Date().toLocaleDateString())            
            axios({
                method:"post",
                url: this.url+'/post/create',
                data:form_post,  
                headers: { "Content-Type": "multipart/form-data"}                              
            })
            .then((res)=>{
                console.log(res.data.codigo==200);
                if(res.data.codigo==200){
                    location.reload()
                    this.$router.go[0]
                }
            })
            .catch((res)=>{
                console.log(res);
            })
        }, 
        

        friendsfindasync(){
            setTimeout(()=>{  
                axios({
                    method:"post",
                    url: this.url+'/user/findFriends',
                    data:{email: this.email}
                })
                .then((res)=>{
                    if(res.data.codigo===204 || res.data.codigo===402){
                        console.log('error en la consulta');
                    }else{                        
                        this.find_fiends=res.data
                        console.log(this.find_fiends);
                    }
                })
                .catch((res)=>{
                    console.log(res);
                })            
            },2000)
        }, 



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
        background-color: grey;
    }

    .photo_perfil{   
        position: absolute;                
        border-radius: 50%;
        height: 200px;
        width: 200px;
        justify-self: center;
        margin-top: 60px;
        
        
    }

    .photo_perfil >img{
        border-radius: 50%;
        height: 200px;
        width: 200px;
    }
    .post{
        grid-area: c;
        margin-top: 10%;
        height: auto;
        width: 80%;
        justify-self: center;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        padding: 2%; 
        display: grid;
        
    }

    .form_post{
        width: 50%;
        justify-self: center;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;        
        padding: 2%;
        margin: 1%;
         

    }
    
    .form_post button{
        margin-top: 2%; 
        color: white;       
    }

    .card-body > img{
        object-fit: cover;
        width: 100%; 
        height: 100%;       
    }

    figure:before,
    figure:after {
        content: '';
        height: 400px;
        width: 100%;
        top: 0;
        left: 0;
        position: absolute;
    }

    .friends{
        grid-area: f;         
        margin-top: 20%;
        width: 90%;
        justify-self: center;
    }

    .friends .form-group{
        padding: 5%;
        justify-self: center;
        display: grid;
        justify-content: center;
    }

    .friends .form-group > input[type=text]{
        margin-top: 5%;
        webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        border: 1px solid gray;
        color: black;
        width: 250px;
        height: 40px;
        padding-left: 10px;
    }
    

    .continer_findfriends{
        width: 100;
        height: 300px;                
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;       
        display: flex;
        overflow: scroll;
        scrollbar-width: thin;
        scrollbar-color: #6969dd #e0e0e0;
    }

    #continer_friends > div{
        display: flex;
        flex-flow: column;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        padding: 5%;
        width: 300px;
        height: auto;
        text-align: center;
    }

    #continer_friends > div button{
        margin-top: 1% ;
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

    @media (max-height: 700px){
        .post{
            height: 600px;
            overflow: scroll;
        }    
    }
    

    }

</style>