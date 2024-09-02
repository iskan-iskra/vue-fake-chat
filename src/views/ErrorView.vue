<template>
  <div class="error-page">
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

<style scoped>
.error-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
}
</style>
