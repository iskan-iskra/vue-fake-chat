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
        <app-user-auth-card
          :userId="user.id"
          :userName="user.name"
          :userStatus="user.status"
          @logingHandler="() => userAuthHandler(user)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppUserAuthCard from './AppUserAuthCard.vue'
export default {
  components: { AppUserAuthCard },
  name: 'AppUserAuthList',
  data() {
    return {
      searchQuery: ''
    }
  },
  computed: {
    userList() {
      return this.$userStore.userList.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      )
    }
  },
  methods: {
    userAuthHandler(user) {
      this.$userStore.loginHandler(user)
      this.$router.push('/chat')
    }
  }
}
</script>
