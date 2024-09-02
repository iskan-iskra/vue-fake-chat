import { themeTool } from '@/tools'

export default {
  data() {
    return {
      currentTheme: themeTool.defaulTheme
    }
  },
  computed: {
    reversedTheme() {
      return themeTool.toggleHandler(this.currentTheme)
    }
  },
  methods: {
    toggleThemeHandler() {
      this.currentTheme = themeTool.toggleHandler(this.currentTheme)
      themeTool.DOMConnection(this.currentTheme)
      themeTool.storage.set(this.currentTheme)
    }
  },
  created() {
    const savedTheme = themeTool.storage.get()
    if (savedTheme) {
      this.currentTheme = savedTheme
      themeTool.DOMConnection(this.currentTheme)
    }
  }
}
