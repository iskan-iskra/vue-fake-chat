class ChatDatabase {
  constructor({ dbName, version = 1 }) {
    this.dbName = dbName
    this.version = version
    this.db = null
  }

  async open() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('chats')) {
          const chatStore = db.createObjectStore('chats', { keyPath: 'hash' })
          chatStore.createIndex('hash', 'hash', { unique: true })
        }
      }

      request.onsuccess = (event) => {
        this.db = event.target.result
        resolve()
      }

      request.onerror = (event) => {
        reject(`Error opening database: ${event.target.errorCode}`)
      }
    })
  }

  async addMessage(hash, message) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['chats'], 'readwrite')
      const store = transaction.objectStore('chats')

      const request = store.get(hash)
      request.onsuccess = (event) => {
        const data = event.target.result || { hash, messages: [] }
        data.messages.push(message)

        const updateRequest = store.put(data)
        updateRequest.onsuccess = () => resolve()
        updateRequest.onerror = (event) => reject(`Error updating chat: ${event.target.errorCode}`)
      }

      request.onerror = (event) => reject(`Error fetching chat: ${event.target.errorCode}`)
    })
  }

  async getMessages(hash) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['chats'], 'readonly')
      const store = transaction.objectStore('chats')

      const request = store.get(hash)
      request.onsuccess = (event) => {
        const data = event.target.result
        resolve(data ? data.messages : [])
      }

      request.onerror = (event) => reject(`Error reading chat: ${event.target.errorCode}`)
    })
  }
}

export default new ChatDatabase({ dbName: 'chatDB' })
