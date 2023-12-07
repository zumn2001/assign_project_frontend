import './assets/style.css'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import 'material-icons/iconfont/material-icons.css';

import { createPinia } from 'pinia'
import { createApp } from 'vue'



import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
