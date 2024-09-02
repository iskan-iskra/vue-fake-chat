import { THEME_VALUES } from '@/const'
import { AppLocalStorage } from './storage-tool'

class ThemeTool {
  #themeLightKey
  #themeDarkKey
  #themeAttributeKey

  constructor({
    theme_light_key,
    theme_dark_key,
    theme_default_key,
    theme_storage_key,
    theme_attribute_key
  }) {
    this.storageKey = theme_storage_key
    this.storage = Object.freeze(new AppLocalStorage(theme_storage_key))
    this.defaulTheme = theme_default_key
    this.#themeAttributeKey = theme_attribute_key
    this.#themeLightKey = theme_light_key
    this.#themeDarkKey = theme_dark_key
  }

  toggleHandler(v) {
    switch (v) {
      case this.#themeDarkKey:
        return this.#themeLightKey
      case this.#themeLightKey:
        return this.#themeDarkKey
      default:
        return this.defaulTheme
    }
  }

  DOMConnection(v) {
    document.documentElement.setAttribute(this.#themeAttributeKey, v)
  }
}

export default Object.freeze(
  new ThemeTool({
    theme_dark_key: THEME_VALUES.DARK,
    theme_light_key: THEME_VALUES.LIGHT,
    theme_default_key: THEME_VALUES.LIGHT,
    theme_storage_key: 'app-theme',
    theme_attribute_key: 'data-bs-theme'
  })
)
