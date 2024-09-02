class DocumentTitleTool {
  #defaultTitle
  constructor({ default_title }) {
    this.#defaultTitle = default_title
  }
  changeTitle(value) {
    document.title = `FCA: ${value}`
  }
  resetTitle() {
    document.title = this.#defaultTitle
  }
}

export default Object.freeze(new DocumentTitleTool({ default_title: 'Fake Chat App' }))
