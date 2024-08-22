// Utilities
import { createPinia } from 'pinia'
import ppp from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(ppp)

export default pinia
