<template>
  <div class="card" :class="isMyMessage ? 'align-self-end border-success' : 'border-primary'">
    <div class="card-header">
      <h5 class="card-title" :class="isMyMessage ? 'text-success' : 'text-primary'">
        {{ userTitle }}
      </h5>
    </div>
    <div class="card-body">
      <div class="card-text">{{ message.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMessageCard',
  props: {
    message: {
      type: Object
    }
  },
  computed: {
    userTitle() {
      return this.isMyMessage
        ? 'me'
        : this.$userStore.userList.find((user) => user.id === this.message.author_id).name
    },
    isMyMessage() {
      return this.$userStore.currentUser.id === this.message.author_id
    }
  }
}
</script>
