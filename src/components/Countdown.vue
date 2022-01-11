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
  name: 'Countdown',
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
      local_zone_abbr:"",
      region:"",
    }
  },
  computed:{
    targetTime(){
      return this.act_time_raw + " " +  this.local_zone_abbr;
    }
  },
  created(){
    let _this = this;
    _this.loadNewData(_this);

    if(!navigator.onLine){
      window.addEventListener("online",()=>{
        _this.loadNewData(_this);
      });
    }
  },
  methods:{
    loadNewData(_this = this,fetchData = true){
        this.loadNextActTime(_this,fetchData);
      
        setInterval(()=>{
          _this.getCountDownData();
        },1000);
    },
    async loadNextActTime(_this,fetchData = true){
      if(navigator.onLine && fetchData){
          fetch("https://valorant-api.com/v1/seasons").then(res => res.json()).then(res => {
            let seasons = res.data;
            localStorage.setItem("seasons_data", JSON.stringify(seasons));
            this.setupEpisodeData(seasons, _this);
          })
        }else{
          this.setupEpisodeData(JSON.parse(localStorage.getItem("seasons_data")),_this);
        }

      _this.local_zone_abbr = moment.tz(moment.tz.guess()).zoneAbbr();
      if(_this.act_time){
        _this.act_time_raw = moment(_this.act_time.clone().add(_this.getRegionHoursGap(),'hours')._d).format("MMM D, YYYY hh:mm A")
      }
    },
    setupEpisodeData(seasons_data,_this){
        if(seasons_data){
          let acts = seasons_data.filter(act => {
            if(act.assetPath.includes("Act")){
              let diff = moment.duration(moment.utc(act.startTime).diff(moment.utc())).add(_this.getRegionHoursGap(),'hours')._data.milliseconds;
              return act.type != null && diff >= 0;
            }
          })
          _this.act_time = moment.utc(acts[0].startTime);
          let ep = (new RegExp('(Episode)([0-9])+').exec(acts[0].assetPath));
          let a = (new RegExp('(Act)([0-9])+').exec(acts[0].assetPath));
          _this.episodeName = ep[1]+" "+ep[2];
          _this.actName = a[1]+" "+a[2];
        }
    },
    regionChanged(region){
      this.region = region;
      this.loadNewData(this,false);
    },
    // setupTimes(){
    //   this.local_zone_abbr = moment.tz(moment.tz.guess()).zoneAbbr();
    //   if(this.act_time){
    //     this.act_time_raw = moment(this.act_time.clone().add(this.getRegionHoursGap(),'hours')._d).format("MMM D, YYYY hh:mm A")
    //   }
    //   this.getCountDownData();
    // },
    getCountDownData(){
      if(this.act_time){
        this.act_time_raw = moment(this.act_time.clone().add(this.getRegionHoursGap(),'hours')._d).format("MMM D, YYYY hh:mm A");
        let d = moment.duration(this.act_time.diff(moment.utc())).add(this.getRegionHoursGap(),'hours')._data;
        this.remaining.months = d.months.toLocaleString("en-US",{minimumIntegerDigits:2});
        this.remaining.days = d.days.toLocaleString("en-US",{minimumIntegerDigits:2});
        this.remaining.hours = d.hours.toLocaleString("en-US",{minimumIntegerDigits:2});
        this.remaining.minutes = d.minutes.toLocaleString("en-US",{minimumIntegerDigits:2});
        this.remaining.seconds = d.seconds.toLocaleString("en-US",{minimumIntegerDigits:2});
        if(this.remaining.seconds < 0){
          this.loadNextActTime(this,false);
        }
      }
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