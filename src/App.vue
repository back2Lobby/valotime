<template>
<div class="head">
  <a href="" class="logo">
    <h2>Valotime</h2>
  </a>
  <p>Valotime provides live countdown according to your current timezone for every next VALORANT Act.</p>
</div>
  <Countdown />
  <a class="follow" href="https://twitter.com/Back2Lobby">Follow @Back2Lobby</a>
</template>

<script>
import Countdown from './components/Countdown.vue'

export default {
  name: 'App',
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
.logo h2{
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

</style>
