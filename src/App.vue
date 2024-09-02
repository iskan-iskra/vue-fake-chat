<template>
  <AppHeader class="py-3" />
  <main>
    <div class="container h-100">
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </main>
</template>
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
