import { userTool, documentTitleTool, userStatusTool } from '@/tools'
import { USER_LIST } from '@/const'
import { reactive } from 'vue'

// чисто проблемы из-за vue 3
// VUE 3 плохо работает с реактивностью VUE 2
// VUE 3 не поддерживает observable c VUE 2
// поэтому обход через reactive

const authPlugin = {
  install(app) {
    const root = reactive({
      currentUser: null,

      onlineIdList: [],

      userList: USER_LIST,

      isLogin() {
        return !!this.currentUser
      },

      loginHandler(user) {
        if (this.currentUser) return
        this.currentUser = user
        userTool.authUser(user.id)
        documentTitleTool.changeTitle(user.name)
        this.onlineIdList = userStatusTool.setOnlineStatus(user.id)
      },

      logoutHandler() {
        if (!this.currentUser) return
        this.onlineIdList = userStatusTool.setOfflineStatus(this.currentUser.id)
        userTool.logoutUser()
        documentTitleTool.resetTitle()
        this.currentUser = null
      },

      _init() {
        documentTitleTool.resetTitle()
        const savedUserId = userTool.getCurrentUser()
        if (!savedUserId) return
        const savedUser = this.userList.find((el) => el.id === +savedUserId)
        if (!savedUser) return
        this.currentUser = savedUser
        userStatusTool.setOnlineStatus(savedUser.id)
        documentTitleTool.changeTitle(savedUser.name)
        this.onlineIdList = userStatusTool.handleMessage()
      }
    })

    window.addEventListener('storage', (event) => {
      if (event.key === userStatusTool.storageKey) {
        this.onlineIdList = userStatusTool.handleMessage()
        root.userList = root.userList.map((el) => ({
          ...el,
          status: this.onlineIdList.includes(el.id)
        }))
      }
    })

    app.config.globalProperties.$userStore = root

    root._init()
  }
}

export default authPlugin
