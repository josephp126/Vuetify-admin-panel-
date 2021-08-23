// Axios Mock Adapter
import "@/plugins/vue-composition-api"
import "@/styles/styles.scss"
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import vuetify from "./plugins/vuetify"
import store from "./store"
import moment from "moment-timezone"

Vue.config.productionTip = false
// Import the Auth0 configuration
import { domain, clientId, audience } from "../auth_config.json"

// Import the plugin here
import { Auth0Plugin } from "./auth"

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    )
  },
})

Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("MM/DD/YYYY hh:mm")
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app")


