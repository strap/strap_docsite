# Strap Connect for Android

Strap provides an `aar` bundle for integrating existing android applications with the Strap API.

## Setup

1. Get the connect bundle, a read key, and a write key from your Strap account manager.
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

Check user connection status.

```java
boolean connected = c.isUserConnected();
```

Launch connection activity.

```java
c.launch();
```

Load current aggregate data.

```java
c.getDailyInfo(new Connect.DailyDelegate() {
    @Override
    public void onDailySuccess(DailyData data) {
        // Handle data
    }

    @Override
    public void onDailyError() {
        // Do something on fail
    }
});
```

Allow disconnect.

```java
c.disconnect();
```

## Retrieve user activity

To retrieve activity for a user, follow the guidance in the <a href="/guides/connect-api">Connect API Reference</a>.
