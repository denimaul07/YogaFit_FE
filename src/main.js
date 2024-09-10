import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import store from "./stores";
import "./assets/css/app.css";

import VueLazyLoad from 'vue3-lazyload'
import VueNumberFormat from 'vue-number-format'
import CKEditor from '@ckeditor/ckeditor5-vue';
import logoutPlugin from 'vue-auto-logout'
import VSelect from 'vue-select'
// import VueSignaturePad from 'vue-signature-pad'
// import vueSignarture from "vue-signature"   
import Vue3Signature from "vue3-signature"
import Multiselect from 'vue-multiselect'
import { DatePicker } from "ant-design-vue";
import Antd from 'ant-design-vue';
import VueApexCharts from "vue3-apexcharts";

const logoutOptions = {
    stagnateTime: 7200000, //per MS
    detectTime: 30 * 60
}


createApp(App)
.use(store)
.use(router)
.use(createPinia())
.use(VueLazyLoad)
.use(Antd)
.use(VueApexCharts)
.use(Vue3Signature)
.component('multiselect', Multiselect)
.use(logoutPlugin, logoutOptions)
.use(CKEditor)
.use(VueNumberFormat, {prefix: 'Rp ', decimal: ',', thounsand: '.'})
.component('v-select', VSelect)

.mount('#app')