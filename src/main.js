import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
// import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader


Vue.use(Vuetify, {
    theme: {
        primary: "#BA68C8",
        secondary: "#9C27B0",
        accent: "#E040FB",
        error: "#F06292",
        warning: "#FFB74D",
        info: "#00BCD4",
        success: "#00C853"
    }
});


new Vue({
  el: '#app',
  render: h => h(App)
})
