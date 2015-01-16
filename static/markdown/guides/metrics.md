# Strap Metrics
With StrapKit JS, adding Strap Metrics to your app is a breeze.
### Initialize
Initializing Strap Metrics allows you to immediately get access to diagnostics and sensor data. You can then log events that are specific to your app.
```javascript
var app_id = "8djanek08sdjk";
StrapKit.Metrics.init(app_id); // Metrics will start logging sensor data

// Log an event
StrapKit.Metrics.logEvent("/myfirstevent/winning");

// Log an event with data
var myInfo = {info: "This was easy"};
StrapKit.Metrics.logEvent("/myfirstevent/data", myInfo);
```