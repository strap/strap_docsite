# Strap Kit

### Cross-Platform Tools for Wearable Developers

A cross platform development framework for wearables.  Strap currently supports build for Pebble and Wear.  In the future, we are working on adding support for Apple Watch and Samsung Gear.  Strap Kit will grow to be a single tool for create and integrating wearable applications across platforms.

### Write your first cross platform app

StrapKit is the library that generates the Pebble and Wear code for a StrapKit-based project. StrapKit uses this library behind the scenes as part of the `strapkit create` command, but you can also use it ad-hoc to generate vanilla Pebble projects.

## Checking Dependencies

Strap Kit requires git, python, node, and npm at a minimum, and platform specific SDK's like Pebble and Android Wear to build for those platforms. To check your dependencies, you can run the command below (requires curl and bash). For a full run down of how to install the dependencies, go to the <a href="https://docs.straphq.com" target="_blank">full developer docs</a>.

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