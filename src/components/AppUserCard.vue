<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        <span>user name: </span>
        <span>{{ userName }}</span>
      </h5>
      <div class="card-text">
        <span>status: </span>
        <span class="badge" :class="userStatus ? 'text-bg-success' : 'text-bg-danger'">{{
          userStatusTitle
        }}</span>
      </div>
    </div>
    <div class="card-footer">
      <button
        :disabled="actionDisabled"
        type="button"
        class="btn btn-outline-primary"
        @click="actionClick"
      >
        {{ actionTitle }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppUserCard',
  props: {
    userName: {
      type: String,
      required: true
    },
    userId: {
      type: Number,
      required: true
    },
    userStatus: {
      type: Boolean,
      required: true
    },
    actionTitle: {
      type: String,
      required: true
    },
    actionDisabled: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    userStatusTitle() {
      return this.userStatus ? 'Online' : 'Offline'
    }
  },
  methods: {
    actionClick() {
      this.$emit('action-handler')
    }
  }
}
</script>
