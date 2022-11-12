import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// debugger;
//redirect to custom domain if its not using it
if(location.host.includes("valotime.live") === false){
  location.href = "https://valotime.live";
}

createApp(App).mount('#app')
