# Strap Kit

### Cross-Platform Tools for Wearable Developers

A cross platform development framework for wearables.  Strap currently supports build for Pebble and Wear. Soon, we'll have support for Apple Watch and Tizen.  

<div class="col-xs-12 text-center">
    <img class="img-responsive text-center col-sm-offset-2 col-xs-12 col-sm-8" src="/img/kit-graphic.png"/>
</div>


## Checking Dependencies

Strap Kit requires git, python, node, and npm at a minimum, and platform specific SDK's like Pebble and Android Wear to build for those platforms. To check your dependencies, you can run the command below (requires curl and bash). For a full run down of how to install the dependencies, go to the <a href="https://docs.straphq.com/docs/strapkit">full developer docs</a>.

```bash
$ curl http://check-config.straphq.com | bash
```

## Installation

```bash
$ sudo npm install strapkit -g
```

## Using the CLI

* Create your Strapkit project.
```bash
$ strapkit create TestProject
```
OR
```bash
$ strapkit create ./TestProject com.testproject TestProject
```

```strapkit create``` generates a starter app.js in ./TestProject/js. This is where you write your app using the API documentation below.

* Choose Pebble and Wear deployment platforms.
```bash
strapkit platform add pebble android-wear
```

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

* Compile for all platforms.
```bash
$ strapkit build
```
OR, to compile for a specific platform, you may specify just Pebble or Wear.
```bash
$ strapkit build [pebble,android-wear]
```
If you wish to forego using Strap kit to install your app, the compiled binary of your app is available in a "build" folder after running the Strap kit build command.

* Install to device.
```bash
$ strapkit install Phones.IP.Goes.Here
```
Publish 'n' Profit!


Use ```strapkit``` to generate a new project with Strap Metrics built right in. More to follow.
<div class="col-xs-12 text-center">
    <img class="img-responsive text-center col-sm-offset-2 col-xs-12 col-sm-8" src="/img/cross-platform.png"/>
</div>
## Write your first cross platform app
