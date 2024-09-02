<script>
import { AppHeader } from '@/components'

export default {
  components: {
    AppHeader
  },
  beforeUnmount() {
    this.$userStore.logoutHandler()
  }
}
</script>

<template>
  <AppHeader class="py-3" />
  <main>
    <div class="container">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>

<style scoped></style>
