# Android > Strap Mobile SDK

Strap provides an `aar` bundle for integrating existing android applications with the Strap API.

## Setup

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
      compile 'com.squareup.retrofit:retrofit:1.8.0'
  }
  ```
1. Sync your project

## Getting Started

Initialize `Connect` instance.  Here, it is assumed that the caller implements the `ConnectDelegate` interface.

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

Allow disconnect.

```java
c.disconnect();
```

## Fetch User Data By Interval

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

## Fetch User Data By Date

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