import { createApp } from 'vue'
import { ID_INJECTION_KEY } from 'element-plus'
import App from './app.vue'
import store from './store'
import router from './router'

const app = createApp(App)
app.provide(ID_INJECTION_KEY, {
    prefix: 1024,
    current: 0
})

app.use(store).use(router)