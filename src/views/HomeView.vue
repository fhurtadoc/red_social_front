<template>
<div id="home"> 
        <navComponent/>
</div>
</template>


<script>
// @ is an alias to /src
import navComponent from '@/components/NavComponent.vue'

export default {
name: 'homeView',
components: {
    navComponent
}
}
</script>

<style>

</style>