import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/routes'

import "../node_modules/bulma/bulma.sass"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

import {
    faBars,
    faSpinner,
    faTableList,
    faCircleExclamation,
    faXmark,
    faCircleCheck,
    faChevronRight,
    faFileSignature,
    faEllipsisV,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons"
 
import {
    faWpforms,
} from "@fortawesome/free-brands-svg-icons"
 
library.add(
    faBars,
    faSpinner,
    faTableList,
    faCircleExclamation,
    faXmark,
    faCircleCheck,
    faChevronRight,
    faFileSignature,
    faEllipsisV,
    faMagnifyingGlass,
    
    faWpforms,
)

const pinia = createPinia()
const app = createApp(App)
app.component('Icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)
app.mount('#app')
