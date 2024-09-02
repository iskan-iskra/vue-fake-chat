<template>
  <div class="d-flex flex-column gap-4 py-4 justify-content-end" style="min-height: 100%">
    <app-message-card
      class="w-50"
      v-for="message in messageList"
      :key="message.time_stamp"
      :message="message"
    />
  </div>
</template>

<script>
import AppMessageCard from './AppMessageCard.vue'
export default {
  name: 'AppMessageList',
  components: { AppMessageCard },
  props: {
    messageList: {
      type: Array
    }
  }
}
</script>

<!--  <div class="d-flex py-4 flex-column justify-content-end gap-4">
    <app-message-card v-for="message in messageList" :key="message.time_stamp" :message="message" />
  </div> -->
