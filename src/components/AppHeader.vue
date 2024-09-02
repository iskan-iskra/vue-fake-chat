<template>
  <header class="border bg-body-tertiary">
    <div class="container hstack">
      <h6 class="d-block d-sm-none m-0">FCA</h6>
      <h4 class="d-none d-sm-block m-0">Fake Chat App</h4>
      <div class="ms-auto hstack gap-2">
        <h5 class="mb-0" v-if="$userStore.currentUser">
          <span>Current user: </span>
          <span class="text-success">{{ $userStore.currentUser.name }}</span>
        </h5>
        <div class="btn-group">
          <button
            v-if="$userStore.currentUser"
            class="btn btn-outline-danger"
            type="button"
            @click="userLogoutHandler"
          >
            logout
          </button>
          <button
            class="btn"
            :class="`btn-${reversedTheme}`"
            type="button"
            @click="toggleThemeHandler"
          >
            {{ reversedTheme }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { themeMixin } from '@/mixins'
export default {
  name: 'AppHeader',
  mixins: [themeMixin],
  methods: {
    userLogoutHandler() {
      this.$userStore.logoutHandler()
      this.$router.push('/')
    }
  }
}
</script>
