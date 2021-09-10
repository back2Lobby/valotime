<template>

<div class="raw-statement">
  Valorant Episode 3 Act 2 Release Date : <strong> {{ targetTime }}</strong>
</div>

<div class="timebox-container">
  <div class="timebox">
    <h3>{{ remaining.months }}</h3>
    <span>Months</span>
  </div>
  <div class="timebox">
    <h3> {{ remaining.days }}</h3>
    <span>Days</span>
  </div>
  <div class="timebox">
    <h3>{{ remaining.hours }}</h3>
    <span>Hours</span>
  </div>
  <div class="timebox">
    <h3>{{ remaining.minutes}}</h3>
    <span>Minutes</span>
  </div>
  <div class="timebox">
    <h3>{{ remaining.seconds}}</h3>
    <span>Seconds</span>
  </div>
</div>
</template>

<script>
import moment from "moment-timezone";

export default {
  name: 'HelloWorld',
  data(){
    return{
      remaining:{
        months:"",
        days:"",
        hours:"",
        minutes:"",
        seconds:""
      },
      act_time_raw:"",
      act_time:"",
      local_zone_abbr:""
    }
  },
  computed:{
    targetTime(){
      return this.act_time_raw + " " +  this.local_zone_abbr;
    }
  },
  created(){

    let _this = this;

    this.loadNextActTime().then(function(){
      _this.setupTimes();

      setInterval(()=>{
        _this.getCountDownData();
      },1000);
    })
  },

  methods:{
    loadNextActTime(){
      return fetch('https://valorant-api.com/v1/seasons')
                .then(res => res.json())
                .then(res => {
                  let acts = res.data.filter(function(act){
                  	return act.type != null && !moment(act.endTime).isBefore();
                  })
                  // this.act_time = moment.tz(moment(acts[0].startTime,["MMM D, YYYY hh:mm A"]),moment.tz.guess());
                  this.act_time = moment(acts[0].endTime).tz(moment.tz.guess());
                });
    },
    setupTimes(){
      this.local_zone_abbr = moment.tz(moment.tz.guess()).zoneAbbr();

      this.act_time_raw = this.act_time.add(3,'hours').format("MMM D, YYYY hh:mm A");

      this.getCountDownData();
    },
    getCountDownData(){
    let d = moment.duration(moment(this.act_time_raw).diff(moment()))._data;
    this.remaining.months = d.months.toLocaleString("en-US",{minimumIntegerDigits:2});
    this.remaining.days = d.days.toLocaleString("en-US",{minimumIntegerDigits:2});
    this.remaining.hours = d.hours.toLocaleString("en-US",{minimumIntegerDigits:2});
    this.remaining.minutes = d.minutes.toLocaleString("en-US",{minimumIntegerDigits:2});
    this.remaining.seconds = d.seconds.toLocaleString("en-US",{minimumIntegerDigits:2});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.raw-statement{
  color:white;
  background-color: #515151;
  display:inline-block;
  padding:0.6rem 0.5rem;
  
}

.timebox-container{
  display:flex;
  align-items: center;
  justify-content:space-between;
  margin:auto;
  max-width: 45rem;
}

.timebox{
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color:white;
}

.timebox h3{
  font-size:5rem;
}

.timebox span{
  color:var(--red);
  font-weight: 600;
}

@media (max-width:640px){
  .timebox h3{
    font-size:1.5rem;
  }
}

</style>
