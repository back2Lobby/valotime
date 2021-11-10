<template>
<div class="head">
  <h2 class="logo">Valotime</h2>
  <div style="position:absolute;right:0;top:1rem;margin-right:1rem;">
    <label style="color:#ddd;margin-right:0.4rem;">Select Region</label>
    <select class="region-dropdown" v-model="region">
      <option value="Asia Pacific">Asia Pacific</option>
      <option value="Brazil">Brazil</option>
      <option value="Europe">Europe</option>
      <option value="Korea">Korea</option>
      <option value="Latin America">Latin America</option>
      <option value="North America" selected>North Amercia</option>
    </select>
  </div>
  <p>Valotime provides live countdown according to your current timezone for every next VALORANT Act.</p>
</div>
  <Countdown v-bind:region="region" />
  <a class="follow" href="https://twitter.com/Back2Lobby">Follow @Back2Lobby</a>
</template>

<script>
import Countdown from './components/Countdown.vue'

export default {
  name: 'App',
  data() {
    return {
      region: 'North America'
    }
  },
  components: {
    Countdown
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

</style>
