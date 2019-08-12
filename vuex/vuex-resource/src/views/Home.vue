<template>
  <div class="home">
    {{$store.state.a}}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
  },
  mounted() {
    console.log('----', this)
  }
};
</script>
