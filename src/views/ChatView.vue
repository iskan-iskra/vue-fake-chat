<template>
  <div class="py-4 h-100 d-flex flex-column">
    <div class="d-flex align-items-center gap-3">
      <button type="button" class="btn btn-secondary" @click="backRoutingHandler">
        {{ '← back' }}
      </button>
      <h5 class="mb-0">
        <span>chat with </span>
        <span>{{ chatFriend.name }}: </span>
        <span class="badge" :class="chatFriend.status ? 'text-bg-success' : 'text-bg-danger'">{{
          friendStatus
        }}</span>
      </h5>
    </div>

    <div class="flex-grow-1 overflow-y-auto" ref="messageContainer">
      <app-message-list :messageList="chatValue" />
    </div>

    <div class="d-flex align-items-center gap-3">
      <div class="flex-grow-1">
        <input
          v-model="newMessage"
          ref="messageInput"
          type="text"
          class="form-control"
          :disabled="messageLoading"
          @keyup.enter="sendMessageHandler"
        />
      </div>
      <button
        :disabled="messageLoading"
        type="button"
        class="btn btn-primary"
        @click="sendMessageHandler"
      >
        send
      </button>
    </div>
  </div>
</template>

<script>
import { AppMessageList } from '@/components'
import { chatDataBaseTool, chatChanelTool, hashUserTool } from '@/tools'
export default {
  name: 'ChatView',
  components: { AppMessageList },
  data() {
    return {
      chatValue: [],
      newMessage: '',
      messageLoading: false
    }
  },
  computed: {
    chatFriend() {
      return this.$userStore.userList.find((user) => user.id === +this.$route.params.id)
    },
    friendStatus() {
      return this.chatFriend.status ? 'online' : 'offline'
    },
    hashCurrentUserPair() {
      return hashUserTool(this.chatFriend, this.$userStore.currentUser)
    }
  },

  methods: {
    backRoutingHandler() {
      this.$router.back()
    },
    setMessageInputFocus() {
      if (this.$refs.messageInput) {
        this.$refs.messageInput.focus()
      }
    },
    scrollToBottom() {
      const container = this.$refs.messageContainer
      if (container) {
        container.scrollTop = container.scrollHeight
        console.log(container)
      }
    },
    async sendMessageHandler() {
      try {
        this.messageLoading = true
        const messageParams = {
          value: this.newMessage,
          author_id: this.$userStore.currentUser.id,
          time_stamp: new Date()
        }
        await chatDataBaseTool.addMessage(this.hashCurrentUserPair, messageParams)
        this.chatValue = await chatDataBaseTool.getMessages(this.hashCurrentUserPair)
        chatChanelTool.sendMessage(this.hashCurrentUserPair, messageParams)
        this.newMessage = ''
        this.$nextTick(() => {
          this.setMessageInputFocus()
          this.scrollToBottom()
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.messageLoading = false
      }
    }
  },

  async created() {
    await chatDataBaseTool.open()

    this.chatValue = await chatDataBaseTool.getMessages(this.hashCurrentUserPair)

    chatChanelTool.open()

    chatChanelTool.listenForMessages((hash, message) => {
      if (this.hashCurrentUserPair === hash) {
        this.chatValue = [...this.chatValue, message]
      }
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    })

    this.$nextTick(() => {
      this.scrollToBottom()
    })
  },

  beforeUnmount() {
    chatChanelTool.close() // Закрываем канал при уничтожении компонента
  }
}
</script>
