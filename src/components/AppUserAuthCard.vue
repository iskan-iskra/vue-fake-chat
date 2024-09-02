<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        <span>user name: </span>
        <span>{{ userName }}</span>
      </h5>
      <div class="card-text">
        <span>status: </span>
        <span>{{ userStatusTitle }}</span>
      </div>
    </div>
    <div class="card-footer">
      <button
        :disabled="userStatus"
        type="button"
        class="btn btn-outline-primary"
        @click="logingHanlder"
      >
        loggin
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppUserAuthCard',
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
      Boolean,
      required: true
    }
  },

  computed: {
    userStatusTitle() {
      return this.userStatus ? 'Online' : 'Offline'
    }
  },
  methods: {
    logingHanlder() {
      this.$emit('loging-handler')
    }
  }
}
</script>
