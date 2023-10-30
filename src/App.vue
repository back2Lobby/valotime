<template>
<div class="head">
  <!-- nav -->
  <div style="display:flex;align-items:center;justify-content:end;width:100%;height:60px;padding:1rem;">
    <!-- select region -->
    <select class="region-dropdown" v-model="region" @change="regionChanged">
      <option value="Asia Pacific">Asia Pacific</option>
      <option value="Brazil">Brazil</option>
      <option value="Europe">Europe</option>
      <option value="Korea">Korea</option>
      <option value="Latin America">Latin America</option>
      <option value="North America" selected>North America</option>
    </select>

    <!-- github repo -->
    <a class="github-button" href="https://github.com/back2Lobby/valotime" alt="Github Repository Link" target="_blank" title="Visit Github Repository">
      <img src="img/github.png" alt="" width="26" height="26">
    </a>
  </div>

  <h2 class="logo">Valotime</h2>
	
  <p style="padding: 0.3rem 0rem;">Valotime provides live countdown according to your current timezone for every next VALORANT Act.</p>
</div>
  <Countdown ref="countdown" @publishNotification="dispatchNotifEvent" />
  <!-- buttons / links -->
  <dir>
    <a class="follow" href="https://twitter.com/Back2Lobby">Follow @Back2Lobby</a>
  </dir>
  <Notification v-bind:notifications="notifications" />

<!-- page views -->
<div style="display:flex; width: 100%;justify-content: end;padding:1rem;flex-grow: 1;align-items: end;">
  <img style="padding-top: 0.6rem" src="https://api.visitor.plantree.me/visitor-badge/pv?namespace=valotime&key=namespace@valotime&label=views&color=cf3333" />  
</div>
</template>

<script>
import Countdown from './components/Countdown.vue'
import Notification from './components/Notification.vue'

export default {
  name: 'App',
  data() {
    return {
      region: 'North America',
      notifications: [
				{
					title:"Wrong Countdown?",
					body:"Please hard reload page with (Ctrl+F5 or Shift+F5) if you see wrong countdown data"
				}
			],
    }
  },
  components: {
    Countdown,
    Notification
  },
  methods: {
    regionChanged() {
      this.$refs.countdown.regionChanged(this.region);
    },
    dispatchNotifEvent(notification){
      // prevent duplicate titles
      if(this.notifications.some(n => n.title === notification.title)){
        return;
      }
      this.notifications.push(notification);
    }
  }
}
</script>

<style>
:root{
  --red:#f84550;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display:flex;
  flex-direction: column;
  height: inherit;
}

body{
  background-color:#2c3e50;
  height: 100vh;
  overflow-y: auto;
}

.head {
    padding-bottom: 0.6rem;
}

.logo{
  margin:auto;
  color:var(--red);
  text-decoration: none;
}
.logo{
  font-size:4rem;
  margin: 1rem 0;
}
.head p{
  color:white;
}

.follow{
  display:inline-block;
  margin-top: 4rem;
  background-color: #1ba1f3;
  color:white;
  padding: 1rem 1.5rem;
  border-radius: 0.7rem;
  text-decoration:none;
}
.follow:hover{
  background-color: #1897e6;
}

.region-dropdown{
  background-color:#cf3333;
  color:#ddd;
  padding: 0.3rem 0.2rem;
  cursor: pointer;
  border:none;
}
.region-dropdown option:hover{
  background-color: #212121;
  color:#cf3333;
}

.github-button{
  display: flex;
  align-items: center;
  margin-left: 0.4rem;
  vertical-align: middle;
  cursor: pointer;
}

</style>
