<template>
  <div id="app"> 
      <homeView></homeView>            
  </div>
</template>


<script>
// @ is an alias to /src
import homeView from '@/views/HomeView.vue'
export default {
  name: 'App',
  components: {
    homeView    
  }
}
</script>

<style>
  
</style>