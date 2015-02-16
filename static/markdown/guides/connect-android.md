# Strap Connect for Android

## Getting Started

You'll need the Connect library for Android, a **read token**, and a **write token**. If you don't have those, contact your account manager or email support@straphq.com.

### Configure the following Gradle dependencies for your app:

```java
compile(name:'strap-connect', ext:'aar')
```

### Create an Intent and start the Activity wherever you'd like to present the user a list of possible connections:

```java
Intent strap = new Intent(this, ServiceList.class);
strap.putExtra("readToken", "myReadToken");
strap.putExtra("writeToken", "myWriteToken");
strap.putExtra("userGUID", "userGUID");
// when a user selects "connect fitness tracker" menu item, for example
startActivity(strap);
```

When you start the Activity, a web view will be loaded which gives the user a list of available connections to choose from. The web view handles the device activation (or deactivation) automatically by facilitating an OAuth workflow on the server side.

### Retrieve user activity

To retrieve activity for a user, follow the guidance in the <a href="/guides/connect-api">Connect API Reference</a>.
