# Strap Kit - Cross-Platform Tools for Wearable Developers

A cross platform development framework for wearables.

Use ```strapkit``` to generate a new project with Strap Metrics built right in. More to follow.

# Write your first cross platform app

```javascript
var splashPage = StrapKit.UI.Page();

var card = StrapKit.UI.Card({
  title: 'Hello World',
  body:'I am alive'
});

// Adds content to a Page
splashPage.addView(card);

// Tells your wearable app to show this page
splashPage.show();
```