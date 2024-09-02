class AppStorage {
  #appStorage
  #key
  constructor({ storage, key }) {
    this.#appStorage = storage
    this.#key = key
  }

  set(v) {
    this.#appStorage.setItem(this.#key, v)
  }
  get() {
    return this.#appStorage.getItem(this.#key)
  }
  clear() {
    this.#appStorage.removeItem(this.#key)
  }
}

export class AppLocalStorage extends AppStorage {
  constructor(key) {
    super({
      storage: localStorage,
      key: key
    })
  }
}

export class AppSessionStorage extends AppStorage {
  constructor(key) {
    super({
      storage: sessionStorage,
      key: key
    })
  }
}
