class ChatChanelTool {
  constructor({ channelName }) {
    this.channelName = channelName
  }

  sendMessage(hash, message) {
    this.channel.postMessage({ hash, message })
  }

  listenForMessages(callback) {
    this.channel.onmessage = (event) => {
      const { hash, message } = event.data
      callback(hash, message)
    }
  }

  open() {
    this.channel = new BroadcastChannel(this.channelName)
  }

  close() {
    this.channel.close()
  }
}

export default new ChatChanelTool({ channelName: 'chat_chanel' })
