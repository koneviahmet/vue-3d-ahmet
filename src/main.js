import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './assets/index.css'
import store from "./store";
import can from './directives/can'
import { TroisJSVuePlugin } from 'troisjs';

const app = createApp(App);
app.directive('can', can)
app.use(router);
app.use(store);
app.use(TroisJSVuePlugin);
app.mount('#app')
