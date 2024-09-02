<template>
  <div class="vstack gap-4">
    <div class="row g-3 pb-3 sticky-top bg-body">
      <div class="col-12 col-sm-6 col-md-4">
        <label for="useSearchQuery" class="form-label">Search user by name</label>
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          id="useSearchQuery"
          placeholder="user name"
        />
      </div>
    </div>
    <div class="row g-3 pb-4">
      <div v-for="user in userList" :key="user.id" class="col-12 col-sm-6 col-md-4">
        <app-user-card
          :userId="user.id"
          :userName="user.name"
          :userStatus="user.status"
          :actionDisabled="false"
          actionTitle="chat"
          @actionHandler="() => chatWith(user)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppUserCard from './AppUserCard.vue'

export default {
  name: 'AppUserChatList',
  components: { AppUserCard },

  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    userList() {
      return this.$userStore.userList
        .filter((el) => el.id !== this.$userStore.currentUser.id)
        .filter((user) => user.name.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()))
    }
  },
  methods: {
    chatWith(user) {
      this.$router.push(`/chat/${user.id}`)
    }
  }
}
</script>
