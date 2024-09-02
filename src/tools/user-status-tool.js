import { AppLocalStorage } from './storage-tool'

class UserStatusTool {
  constructor({ storage_key }) {
    this.storageKey = storage_key
    this.onlineUsersStore = new AppLocalStorage(storage_key)
    this.userStatus = JSON.parse(this.onlineUsersStore.get()) || []
    // window.addEventListener('storage', (event) => {
    //   if (event.key === storage_key) {
    //     this.handleMessage()
    //   }
    // })
  }

  // Обработчик сообщений
  handleMessage() {
    this.userStatus = JSON.parse(this.onlineUsersStore.get()) || []
    this.updateUserList()
    return this.userStatus
  }

  // Отправляем сообщение о том, что пользователь онлайн
  setOnlineStatus(userId) {
    this.userStatus = [...this.userStatus, userId]
    this.updateUserList()
    return this.userStatus
  }

  // Отправляем сообщение о том, что пользователь офлайн
  setOfflineStatus(userId) {
    this.userStatus = this.userStatus.filter((el) => el !== userId)
    this.updateUserList()
    return this.userStatus
  }

  // Обновляем список пользователей
  updateUserList() {
    this.onlineUsersStore.set(JSON.stringify(this.userStatus))
  }
}

// Использование класса
export default new UserStatusTool({ storage_key: 'app-users-online' })
