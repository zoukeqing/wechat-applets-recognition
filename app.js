//app.js
App({
  config:{
    host:'bushtop.top'
    // host:'localhost:2270'
  },
  
  onLaunch:()=> {
  },
  onShow:()=>{
  },
  // 背景图index
  current() {
    return parseInt(Math.random() * 5)
  }
})