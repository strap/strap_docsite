# Strap Kit

## A cross platform development framework for wearables.

Use ```strapkit``` to generate a new project with Strap Metrics built right in. More to follow.
<div class="col-xs-12 text-center">
    <img class="img-responsive text-center col-sm-offset-2 col-xs-12 col-sm-8" src="/img/cross-platform.png"/>
</div>
## Write your first cross platform app

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