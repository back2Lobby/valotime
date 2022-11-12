import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

//redirect to custom domain if its not using it
if(location.host.search("valotime.live") === -1){
  location.href = "https://valotime.live";
}

createApp(App).mount('#app')
