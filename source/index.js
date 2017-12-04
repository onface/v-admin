window.vAdmin = window.iview
var JSON5 = require('json5')
vAdmin.str = require('./str')
vAdmin.ajax = require('./ajax')
Vue.component('v-ajax', require('./v-ajax'))
Vue.component('v-form', require('./v-form'))
vAdmin.ListLogc = require('./ListLogic').default
