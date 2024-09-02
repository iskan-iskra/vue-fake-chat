import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { userStore } from '@/plugins'
import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'

const app = createApp(App)

app.use(userStore)

router.customInjectionHandler(app.config.globalProperties.$userStore)

app.use(router)

app.mount('#app')
