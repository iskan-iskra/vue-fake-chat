import { AppLocalStorage } from './storage-tool'

class UserStatusTool {
  constructor({ storage_key }) {
    this.storageKey = storage_key
    this.onlineUsersStore = new AppLocalStorage(storage_key)
    this.userStatus = JSON.parse(this.onlineUsersStore.get()) || []
  }

  handleMessage() {
    this.userStatus = JSON.parse(this.onlineUsersStore.get()) || []
    return this.userStatus
  }

  setOnlineStatus(userId) {
    if (this.userStatus.includes(userId)) return this.userStatus
    this.userStatus = [...this.userStatus, userId]
    this.updateUserList()
    return this.userStatus
  }

  setOfflineStatus(userId) {
    this.userStatus = this.userStatus.filter((el) => el !== userId)
    this.updateUserList()
    return this.userStatus
  }

  updateUserList() {
    this.onlineUsersStore.set(JSON.stringify(this.userStatus))
  }
}

export default new UserStatusTool({ storage_key: 'app-users-online' })
