# Strap Kit Elements

## Page
A Page is the container for all your app's UI. When you create a new page, you are bringing the user to a different set of looks and actions.

### Example

```javascript
var splashPage = StrapKit.UI.Page();

var card = StrapKit.UI.Card({
  title: 'Weather App',
  body:'Loading data now...'
});

// Adds content to a Page
splashPage.addView(card);

// Tells your wearable app to show this page
splashPage.show();
```
### Initialize
```javascript
var page = StrapKit.UI.Page();
```
OR
```javascript
var page = StrapKit.UI.Page(cardView);
var page = StrapKit.UI.Page([textView, anotherView]);
```
### Add View
```javascript
page.addView(textView);
```
### Show Page
```javascript
page.show();
```

## Card View
Card is a standard wearable UI compenent accross all platforms. This UI compenent typically has a title and a body associated with it, and can be clickable. This must be added to a Page in order for the compenent to be shown.

### Example
```javascript
var card = StrapKit.UI.Card({
  title: "My First App",
  body: "Writing apps are easy with StrapKit JS"
});
myPage.addView(card);
```
### Initialize
```javascript
var card = StrapKit.UI.Card({
    title: 'My Title',  // The title of your card
    body: 'My Body',  // The body of your card
    onClick: function() { // What happens when you click on the card
        console.log('My Function');
    }
});
```
### Set On Click Function
```javascript
card.setOnClick(function() {
    console.log("My Card was clicked");
});
```
## Text View
TextView is a standard wearable UI compenent accross all platforms. This UI compenent can show text and a position of your your choosing.
### Example
```javascript
var textView = StrapKit.UI.TextView({
    position: "center",
    text: "Loading weather data..."
});
myPage.addView(textView);
```
### Position
```javascript
StrapKit.UI.TextView({
    position: 'center|right|left'
    // center: puts text center justified within your page
    // right: puts text right justified within your page
    // left (default): puts text left justificed within your page
});
```
## List View
ListView is a standard wearable UI compenent accross all platforms. This UI compenent will show a list of items defined by you. And Item will contain a title and a subtitle as strings. To make the app more interactive, you can attach an object to and Item as data.
### Example
```javascript
var menuItems = [
    {
        title: 'My Title 1',
        subtitle: 'My Subtitle 1',
        data: {info: "My Info 1"}
    },
    {
        title: 'My Title 2',
        subtitle: 'My Subtitle 2',
        data: {info: "My Info 2"}
    }];

var resultsMenu = StrapKit.UI.ListView({
    items: menuItems
});

resultsMenu.setOnItemClick(function(e) {
    console.log(JSON.stringify(e.item));
    // { "title":"My Title 1","subtitle":"My Subtitle 1","data":{"info":"My Info 1"}}
    console.log(e.itemIndex);
    // 0
});
```
### Set On Item Click
```javascript
myList.setOnItemClick(function(e) {
    e.item // returns the item you clicked on containing title, subtitle and data
    e.itemIndex // returns the index of the item you clicked on
});
```
## HttpClient
HttpClient allows you to access API clients outside of the wearable app.
### Example
```javascript
StrapKit.HttpClient(
  {
    url:'http://api.openweathermap.org/data/2.5/forecast?q=London',
    type:'json'
  },
  function(data) {
    console.log(JSON.stringify(data));
  },
  function(error) {
    console.log(error);
  }
);
```
### Opts
```javascript
StrapKit.HttpClient({
  // url: url to call
  // method: 'POST', 'GET', 'UPDATE', etc
  // data: { 'username': 'myUsername'}
  // heaaders: { 'Authorization': 'Token: 0sdknweeksokdf0'}
}, success, failure);
```

## Location
StrapKit JS can leverage native geolocation in Javascript to get the location of the device. A callback can be used to extract the `position` from the successful function. The generic form of this method is:

```
navigator.geolocation.getCurrentPosition(success, failure, options);
```

#### Example
```
if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Got geolocation!");

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

    }, function() {
        console.log("Failed to get geolocation!");
    }, {
        maximumAge: 50000,
        timeout: 5000,
        enableHighAccuracy: true
    });
}
```
## Full Sample app.js
The following is the sample app.js that comes with a fresh project.
```
var StrapKit = require('strapkit');

var parseFeed = function(data, quantity) {
    var items = [];
    for (var i = 0; i < quantity; i++) {
        // Always upper case the description string
        var title = data.list[i].weather[0].main;
        title = title.charAt(0).toUpperCase() + title.substring(1);


        var date = new Date(data.list[i].dt_txt);

        var displayDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + formatDateTime(date);

        // Get date/time substring
        var time = data.list[i].dt_txt;
        time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);

        // Add to menu items array
        items.push({
            title: title,
            subtitle: displayDate,
            data: data.list[i]
        });
    }

    // Finally return whole array
    return items;
};

var formatDateTime = function(date) { // This is to display 12 hour format like you asked
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
};

var app_id = "njgrse2JSpYBpFCSa";

StrapKit.Metrics.Init(app_id);

// Show splash screen while waiting for data
var splashPage = StrapKit.UI.Page();

// Text element to inform user
var card = StrapKit.UI.TextView({
    position: 'center',
    text: 'Loading data now...'
});

// Add to splashPage and show
splashPage.addView(card);
splashPage.show();

StrapKit.Metrics.logEvent("/show/splashPage");

// Make request to openweathermap.org
StrapKit.HttpClient({
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=London',
        type: 'json'
    },
    function(data) {

        var menuItems = parseFeed(data, 10);

        StrapKit.Metrics.logEvent("/httpClient/success", menuItems);

        var resultsPage = StrapKit.UI.Page();
        // Construct Menu to show to user
        var resultsMenu = StrapKit.UI.ListView({
            items: menuItems
        });

        // Add an action for SELECT
        resultsMenu.setOnItemClick(function(e) {
            // Get that forecast
            var forecast = e.item.data;

            // Assemble body string
            var content = forecast.weather[0].description;

            // Capitalize first letter
            content = content.charAt(0).toUpperCase() + content.substring(1);

            // Add temperature, pressure etc
            content += '\nTemperature: ' + Math.round(forecast.main.temp - 273.15) + '°C' + '\nPressure: ' + Math.round(forecast.main.pressure) + ' mbar' +
                '\nWind: ' + Math.round(forecast.wind.speed) + ' mph, ' +
                Math.round(forecast.wind.deg) + '°';

            var detailPage = StrapKit.UI.Page();
            // Create the Card for detailed view
            var detailCard = StrapKit.UI.Card({
                title: e.item.subtitle,
                body: content
            });
            detailPage.addView(detailCard);
            detailPage.show();

            StrapKit.Metrics.logEvent("show/detailPage", e.item.data);
        });

        // Show the Menu, hide the splash
        resultsPage.addView(resultsMenu);
        resultsPage.show();

        StrapKit.Metrics.logEvent("show/resultsPage");

    },
    function(error) {
        console.log(error);
    }
);
```

## More Examples

We're building a "best of" repo to showcase great Strap Kit apps from the community. Submit a pull request if you'd like us to include yours!
<p>
<a class="btn btn-default" href="https://github.com/strap/strapkit_samples" target="_blank"><i class="icon icon-github"></i> More Examples</a>
</p>
