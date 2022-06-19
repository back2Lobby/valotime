<template>
<div class="head">
  <h2 class="logo">Valotime</h2>
  
  <!-- page views -->
  <img style="display:none;position:absolute;margin:4px;bottom:0px;right:0px;" src="https://visitor-badge.glitch.me/badge?page_id=valotime.pageviews" />
  
  <!-- nav -->
  <div style="position:absolute;right:0;top:1rem;margin-right:1rem;display:flex;">
    <!-- select region -->
    <select class="region-dropdown" v-model="region" @change="regionChanged">
      <option value="Asia Pacific">Asia Pacific</option>
      <option value="Brazil">Brazil</option>
      <option value="Europe">Europe</option>
      <option value="Korea">Korea</option>
      <option value="Latin America">Latin America</option>
      <option value="North America" selected>North Amercia</option>
    </select>

    <!-- github repo -->
    <a class="github-button" href="https://github.com/back2Lobby/valotime" alt="Github Repository Link" target="_blank" title="Visit Github Repository">
      <img src="img/github.png" alt="" width="26" height="26">
    </a>
  </div>
  <p>Valotime provides live countdown according to your current timezone for every next VALORANT Act.</p>
</div>
  <Countdown ref="countdown" @publishNotification="dispatchNotifEvent" />
  <a class="follow" href="https://twitter.com/Back2Lobby">Follow @Back2Lobby</a>
  <Notification v-bind:notifications="notifications" />
</template>

<script>
import Countdown from './components/Countdown.vue'
import Notification from './components/Notification.vue'

export default {
  name: 'App',
  data() {
    return {
      region: 'North America',
      notifications: [],
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}

body{
  background-color:#2c3e50;
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
