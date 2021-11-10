<template>

<div class="raw-statement">
  Valorant {{episodeName}} {{actName}} Release Date : <strong> {{ targetTime }}</strong>
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
  props:['region'],
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
      act_time:null,
      episodeName:"",
      actName:"",
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
                  	return act.type != null && !moment(act.startTime).isBefore();
                  })
                  // this.act_time = moment.tz(moment(acts[0].startTime,["MMM D, YYYY hh:mm A"]),moment.tz.guess());
                  this.act_time = moment.utc(acts[0].startTime);
                  let ep = (new RegExp('(Episode)([0-9])+').exec(acts[0].assetPath));
                  let a = (new RegExp('(Act)([0-9])+').exec(acts[0].assetPath));
                  this.episodeName = ep[1]+" "+ep[2];
                  this.actName = a[1]+" "+a[2];
                });
    },
    setupTimes(){
      this.local_zone_abbr = moment.tz(moment.tz.guess()).zoneAbbr();
      this.act_time_raw = moment(this.act_time.clone().add(this.getRegionHoursGap(),'hours')._d).format("MMM D, YYYY hh:mm A")
      this.getCountDownData();
    },
    getCountDownData(){
      this.act_time_raw = moment(this.act_time.clone().add(this.getRegionHoursGap(),'hours')._d).format("MMM D, YYYY hh:mm A");
      let d = moment.duration(this.act_time.diff(moment.utc())).add(this.getRegionHoursGap(),'hours')._data;
      this.remaining.months = d.months.toLocaleString("en-US",{minimumIntegerDigits:2});
      this.remaining.days = d.days.toLocaleString("en-US",{minimumIntegerDigits:2});
      this.remaining.hours = d.hours.toLocaleString("en-US",{minimumIntegerDigits:2});
      this.remaining.minutes = d.minutes.toLocaleString("en-US",{minimumIntegerDigits:2});
      this.remaining.seconds = d.seconds.toLocaleString("en-US",{minimumIntegerDigits:2});
    },
    getRegionHoursGap(){
      switch(this.region){
        case "Asia Pacific":
          return 21;
        case "Brazil":
          return 13;
        case "Europe":
          return 27;
        case "Korea":
          return 21;
        case "Latin America":
          return 13;
        case "North America":
          return 13;
        default:
          return 13;
      }
    },
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
