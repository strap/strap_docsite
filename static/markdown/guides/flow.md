# Strap Kit Flow

* Create your Strapkit project.
```bash
$ strapkit create TestProject
```
OR
```bash
$ strapkit create ./TestProject com.testproject TestProject
```

* Write your app using the API documentation below.

* Choose deployment platforms.
```bash
$ strapkit platforms add pebble android-wear
```
OR, to add just one platform only, you may specify that platform by itself.
```bash
$ strapkit platform add pebble
```
Removing platforms is just as easy as adding them.
```bash
$ strapkit platform remove pebble
```

* Compile for all platforms.
```bash
$ strapkit build
```
OR, to compile for one platform only, you may specify just that platform.
```bash
$ strapkit build pebble
```
If you wish to forego using Strap kit to install your app, the compiled binary of your app is available in a "build" folder after running the Strap kit build command.

* Install to device.
```bash
$ strapkit install Phones.IP.Goes.Here
```
Publish 'n' Profit!