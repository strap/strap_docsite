# Android > Strap Mobile SDK

Strap provides an `aar` bundle for integrating existing android applications with the Strap API.

## Setup
### Register key certificate on Developer Console
Strap library uses the Fit Api. To access to it you must register the .apk file's public certificate in the Developers Console using your Android package name and SHA-1 fingerprint.

To ghet the SHA-1 fingerprint you can call
``` keytool -exportcert -alias YOUR_CERTIFICATE_NAME -keystore YOUY_KEYSTORE -list -v ```

Remember to register also the debug certificate (`YOUR_CERTIFICATE_NAME`=`androiddebugkey`, `YOUY_KEYSTORE` usually `~/.android/debug.keystore` on Linux/MacOS or `C:\Users\[USER]\.android\debug.keystore` on Windows, password `android`)

Register the certificate on the Developer Console under `Add credentials` > `OAuth 2.0 client ID` choosing `Android`.

More infos at [https://developers.google.com/console/help/new/?hl=en_US#installedapplications-android]

### Demo App
We have a demo app avaialble for testing.  You can download it from: [https://s3.amazonaws.com/strap-libs/MyApplication.rar](https://s3.amazonaws.com/strap-libs/MyApplication.rar)

### Android Studio
1. Download the bundle [https://s3.amazonaws.com/strap-libs/connect.aar](https://s3.amazonaws.com/strap-libs/connect.aar)
1. Move the bundle into the `libs` directory under your application module
1. Update your module `build.gradle` to include the following
  ```
  repositories {
      flatDir {
        dirs 'libs'
      }
  }

  dependencies {
      compile(name:'connect', ext:'aar')
      compile 'com.google.android.gms:play-services-fitness:8.3.0'
      compile 'com.squareup.retrofit:retrofit:1.8.0'
  }
  ```
1. Sync your project

## Getting Started
### Configure the Manifest
To properly handle third party services like FitBit, your app needs to handle the custom URL scheme strapconnect-your_write_token.
To do so, add this `intent-filter` to your entry point activity (usually `.MainActivity`) in `AndroidManifest.xml` file (assuming your write token is abc123ABC):
```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="strapconnect-abc123abc" />
</intent-filter>
```
Pay attention that, even if your write token contains uppercase letters, in the `intent-filter` you must write it all in  lowercase.

### Initialize `Connect` instance.  
Here, it is assumed that the caller implements the `ConnectDelegate` interface.
```java
// Initialize Connect
c = new Connect.Builder(this, this)
        .setAppName("your_app_name")
        .setWriteToken("your_write_token")
        .setReadToken("your_read_token")
        .setShowDialog(true) // whether to ask for confirmation
        .setUserId("user_guid")
        .build();
```

To let StrapConnect handle the redirects when connecting to third party services like FitBit, in the `onCreate` event and after istantiated the `Connect` instance, add:
```java
Intent intent = getIntent();
Uri data = intent.getData();
if (data != null) {
  c.ConnectAuthComplete(data.toString());
}
```

## Managing User Connection

Check user connection status.

```java
boolean connected = c.isUserConnected();
```

Launch connection activity.
```java
c.launch();
```

If a user successfully connects your `ConnectDelegate` implementation will be notified.
```java
public void onConnected() {
    Log.d(TAG, "User connected!");
}
```
When user updates the profile:
```java
public void onComplete() {
    Log.d(TAG, "Profile update completed.");
}
```

Allow disconnect.

```java
c.disconnect();
```

## Fetch User Data 

### By Interval

Fetch user's latest report for each interval

```java
c.getDaily(new Connect.ReportCallback() {
    @Override
    public void onSuccess(Report data) {
        // Handle data
    }

    @Override
    public void onError() {
        // Do something on fail
    }
});

c.getWeekly(new Connect.ReportCallback() {
    @Override
    public void onSuccess(Report data) {
        // Handle data
    }

    @Override
    public void onError() {
        // Do something on fail
    }
});

c.getMonthly(new Connect.ReportCallback() {
    @Override
    public void onSuccess(Report data) {
        // Handle data
    }

    @Override
    public void onError() {
        // Do something on fail
    }
});
```

### By Date

Fetch user's activity for a specific date

```java
c.getActivityForDate("2015-03-15", new Connect.ActivityCallback() {
    @Override
    public void onSuccess(List<Report> data) {
        Iterator<Report> iter = data.iterator();
        Log.d(TAG, "Have " + data.size() + " reports");
        Log.d(TAG, iter.next().date);
    }

    @Override
    public void onError() {
        Log.e(TAG, "Failed to fetch activity");
    }
});
```

Fetch user's activity for a specific date range

```java
c.getActivityForRange("2015-03-15", "2015-03-17", new Connect.ActivityCallback() {
    @Override
    public void onSuccess(List<Report> data) {
        Iterator<Report> iter = data.iterator();
        Log.d(TAG, "Have " + data.size() + " reports");
        Log.d(TAG, iter.next().date);
    }

    @Override
    public void onError() {
        Log.e(TAG, "Failed to fetch activity");
    }
});
```

### Prebuild Fragment
For convenience a prebuild fragment is provided that displays the user activity of the last 30 days.
It can be istantiated calling the static method `GetConnectedFragment()` and can be used as part of a user-defined activity.
```java    
private com.straphq.connect.android.ui.fragment.ConnectedFragment connectLibraryConnectedFragment = Connect.GetConnectedFragment();
```

## Add User Data

Food Eated
```java    
Date date = new Date();
c.addFood("Good apple", date, calories, carbs, fat, protein, fiber, sodium, water);
```

Add Sleep
```java
Date startDate = new Date();
Date endDate = new Date();
c.addSleep(Date startDate, Date endDate);
```

Body data
```java
c.addBody(BMI, weightKG, BFP);
```

## Food Suggestions
To have suggestion about typical food properties there are three methods logically sequential.
Calling activity must implement the interfaces:
```java
public interface FoodCallback {
      void onSuccessAuto(List<FoodAuto> data);
      void onSuccessSearch(FoodSearch data);
      void onSuccessItem(FoodItem data);
      void onError();
}
```

To get food spelling suggestion call:
```java
c.getFoodAuto(term, this);
```

To get a list of possible food call:
```java
c.getFoodSearch(term, this);
```

To ghet details about certain food call:
```java
c.getFoodItem(itemId, this);
```