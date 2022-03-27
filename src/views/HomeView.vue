<template>
<div id="home"> 
        <NavComponent/>        
        <router-view />
</div>
</template>


<script>
// @ is an alias to /src
import NavComponent from '@/components/NavComponent.vue'

export default {
name: 'homeView',
components: {
    NavComponent
}
}
</script>

<style>

</style>