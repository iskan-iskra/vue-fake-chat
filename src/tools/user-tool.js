import { AppSessionStorage } from './storage-tool'

class User {
  #authService
  currentUser = null

  constructor({ authUserKey }) {
    this.#authService = new AppSessionStorage(authUserKey)
  }

  authUser(userId) {
    this.currentUser = this.#authService.set(userId)
  }

  logoutUser() {
    this.#authService.clear()
    this.currentUser = null
  }

  getCurrentUser() {
    const savedUser = this.#authService.get()
    this.currentUser = savedUser || null
    return this.currentUser
  }
}

export default new User({ authUserKey: 'app-user' })
