# Strap Connect for iOS

## Getting Started

You'll need the Connect library for iOS, a **read token**, and a **write token**. If you don't have those, contact your account manager or email support@straphq.com.

### Include strap-connect.a in your XCode project.

Libraries can be added in XCode by navigating in project settings to General->Linked Frameworks and Libraries

<img src="https://www.dropbox.com/s/1grgujgejqlrj5l/Screenshot%202015-02-16%2011.34.05.png?dl=1"/>

### Add StrapConnect.h to your Xcode project.

Add the header file wherever you will need it in your project structure.

<img src="https://www.dropbox.com/s/nd6yhv06ihe2xys/Screenshot%202015-02-16%2011.37.41.png?dl=1"/>

### Import StrapConnect.h in the implementation which contains your logic.

<img src="https://www.dropbox.com/s/36irxpp4qjjaivx/Screenshot%202015-02-16%2011.38.44.png?dl=1"/>

### Instantiate StrapConnect wherever you'd like to present the user a list of possible connections:

```objective-c
NSDictionary * connect_params = @{
						@"readToken":@"abc123xyz",
						@"writeToken":@"abc123xyz",
						@"userGUID":@"A27DDFC2-A483-4C2A-AFFC-0379CF3CA935"
						};

[StrapConnect getConnectionsList:connect_params];

```

When you call getConnectionsList, a web view will be loaded which gives the user a list of available connections to choose from. The web view handles the device activation (or deactivation) automatically by facilitating an OAuth workflow on the server side.

### Retrieve user activity

To retrieve activity for a user, follow the guidance in the <a href="/guides/connect-api">Connect API Reference</a>.
