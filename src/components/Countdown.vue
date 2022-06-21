<template>

<div class="raw-statement">
  Valorant {{episodeName}} {{actName}} {{dateType}} Date : <strong> {{ targetTime }}</strong>
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
import seasonsDataBackup from "../seasons_backup.json";

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
      dateType:"",
      local_zone_abbr:"",
      region:"",
      modifier_data: { //modify data manually if needed
        days: 1,
        action: "add"
      }
    }
  },
  emits: [
    "publishNotification",
  ],
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
    processManualModification(targetTime){
      if(this.modifier_data.action === "add"){
        return targetTime.add(this.modifier_data.days,'days');
      }else if(this.modifier_data.action === "subtract"){
        return targetTime.subtract(this.modifier_data.days,'days');
      }
    },
    getNextActThatIsNotStartedYet(seasons_data,_this){
      return seasons_data.filter(act => act.assetPath.includes("Act") && act.type !== null).filter(act => {
          let targetTime = this.processManualModification(moment.utc(act.startTime));

          let diff = moment.duration(targetTime.diff(moment.utc())).add(_this.getRegionHoursGap(),'hours')._milliseconds;
          return diff >= 0;
      })
    },
    getLatestActFromSeasonsData(seasons_data,_this){
      let acts = [];

      acts = this.getNextActThatIsNotStartedYet(seasons_data,_this);

      if(acts.length <= 0){
        acts = this.getNextActThatIsNotStartedYet(seasonsDataBackup.data,_this);
      }

      return acts;
    },
    setupEpisodeData(seasons_data,_this){
        if(seasons_data){

          let nextActNotAvailable = false;

          let acts = this.getLatestActFromSeasonsData(seasons_data,_this);

          // if its doesn't found any act from list then use the last one in list
          let act = acts.length > 0 ? acts[0] : null;
          if(!act){
            acts = seasons_data.filter(act => act.assetPath.includes("Act") && act.type !== null);
            act = acts[acts.length - 1];
            nextActNotAvailable = true;
          }

          let targetTime = !nextActNotAvailable ? act.startTime : act.endTime;

          // add or subtract a day if needed (incase valorant updated data)
          targetTime = this.processManualModification(moment.utc(targetTime));

          // publish notification if act time is already passed
          if(moment.duration(targetTime.diff(moment.utc())).add(_this.getRegionHoursGap(),'hours')._milliseconds < 0){
            this.$emit("publishNotification",{
              title:"Patch Delayed",
              body:"Patch/Update has been changed by VALORANT. Countdown will be updated shortly."
            });
          }

          _this.act_time = targetTime;

          let ep = (new RegExp('(Episode)([0-9])+').exec(act.assetPath));
          let a = (new RegExp('(Act)([0-9])+').exec(act.assetPath));
          _this.episodeName = ep[1]+" "+ep[2];
          _this.actName = a[1]+" "+a[2];
          _this.dateType = !nextActNotAvailable ? "Start" : "End";
        }
    },
    regionChanged(region){
      this.region = region;
      this.loadNewData(this,false);
    },
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