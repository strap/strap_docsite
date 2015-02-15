# Getting Started

## Use the VM

We've created a virtual machine with Vagrant which contains all of the dependencies you need to get started quickly. For more information, check out <a href="/guides/kit-vm">Using the VM</a>. Otherwise, you can install the dependencies locally by following the guide below.

## System Requirements

Strap Kit requires git, python, node, and npm at a minimum, and platform specific SDK's like Pebble and Android Wear to build for those platforms. To check your dependencies, you can run the command below.

```bash
$ curl http://check-config.straphq.com | bash
```

# Installation

```bash
$ sudo npm install -g strapkit
```

## Pebble Dependencies

For Pebble, you'll need the latest <a href="https://developer.getpebble.com/sdk/" target="_blank">Pebble SDK</a>.


## Android Wear Dependencies

For Android Wear, you'll need to follow these steps for Strap Kit to build and deploy your project.

### JAVA_HOME
#### Linux

Check if already set
```sh
$ echo $JAVA_HOME
```
If nothing there simply make this command:
```sh
$ sudo apt-get install openjdk-7-jdk
$ update-alternatives --config java
```
#### Mac
Follow this link: http://javatechig.com/java/core-java/set-java_home-environment-variable-mac-os-x

### ADB
#### Linux
```sh
$ sudo apt-get install android-tools-adb
```

#### Mac
Should be included with Android SDK. Make sure you path is set up. Follow the Android SDK instructions.

### ANDROID_HOME and Android SDK
#### Linux

#### If Android SDK Already installed
```sh
$ export ANDROID_HOME=~/android-sdk/android-sdk-linux/
$ export PATH=$PATH:$ANDROID_HOME/tools
```


#### Otherwise, get the Android SDK
1. Option 1 with IDE: Download [Android Studio](http://developer.android.com/sdk/index.html). Check that ANDROID_HOME is in the path following the steps above.
2. Option 2 without IDE: Follow these instructions:
```sh
$ wget http://dl.google.com/android/android-sdk_r24.0.2-linux.tgz
$ mkdir -p ~/android-sdk
$ tar zxvf android-sdk_r24.0.2-linux.tgz -C ~/android-sdk/
$ rm android-sdk_r24.0.2-linux.tgz
$ export ANDROID_HOME=~/android-sdk/android-sdk-linux/
$ export PATH=$PATH:$ANDROID_HOME/tools
```

Note: For linux 64-bit machines, make sure you run the command:
```sh
$ sudo apt-get install lib32stdc++6 lib32z1
```

#### Mac
1. Option 1 with IDE: Download [Android Studio](http://developer.android.com/sdk/index.html)
2. Option 2 without IDE: Instructions coming soon...

### Install appropriate SDK tools
Assuming you set the ANDROID_HOME environmental variable and added ANDROID_HOME/tools to your PATH do the command to open up the SDK Manager:
#### If you installed the IDE
```sh
$ android update sdk
```
#### Command line only

To install the Android packages from the command line, first use ```android list sdk``` to get a list of available packages, then pass in the indexes to ```update``` to match the required packages below. Or omit ```--filter``` to download all packages (warning, this is a large download).
```sh
$ android list sdk
$ android update sdk --no-ui --filter 1,2,3,4,...
```

#### Required packages

1. Tools > Android SDK Tools
2. Tools > Android SDK Platform-tools
3. Tools > Android SDK Build-tools Rev. 21.1.1
4. Android 5.0.1 (API 21) > SDK Platform
5. Android 4.4W.2 (API 20) > SDK Platform
6. Android 4.4W.2 (API 20) > Android Wear ARM EABI v7a System Image
7. Android 4.3.1 (API 18) > SDK Platform
8. Extras > Android Support Repository
9. Extras > Android Support Library
10. Extras > Google Play Services
11. Extras > Google Repository
