<template>
  <div class="h-100 w-100 d-flex flex-column justify-content-center align-items-center gap-5">
    <h1>error 404</h1>
    <div>Page not found</div>
    <button type="button" class="btn btn-outline-secondary" @click="returnHandler">return</button>
  </div>
</template>

<script>
export default {
  name: 'ErrorView',
  methods: {
    returnHandler() {
      this.$router.push('/')
    }
  }
}
</script>
