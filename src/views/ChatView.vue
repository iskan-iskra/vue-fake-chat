<template>
  <div class="py-4 h-100 d-flex flex-column">
    <div>chat with {{ chatFriend.name }}</div>
    <div class="flex-grow-1"></div>
    <div class="d-flex gap-3">
      <div class="flex-grow-1"><input type="text" class="form-control" /></div>
      <div class=""><button type="button" class="btn btn-primary">send</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatView',
  computed: {
    chatFriend() {
      return this.$userStore.userList.find((user) => user.id === +this.$route.params.id)
    }
  }
}
</script>
