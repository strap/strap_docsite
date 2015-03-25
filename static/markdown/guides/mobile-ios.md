# Strap for iOS

Strap provides a universal cocoa touch framework for iOS applications to integrate the strap product offering into an existing mobile application.

## Setup

1. Get the connect bundle, a read key, and a write key from your Strap account manager.
1. Unzip into your desired location, possibly within your application source.
1. Add to your build target.
  1. Select your build target
  1. Select "Build Phases"
  1. Expand "Link Binary With Libraries"
  1. Click "+" -> "Add Other"
  1. Navigate to and select "StrapConnect.framework"
  1. When finished, your build phases should be similar to the below
  ![](https://cldup.com/uGPeb5_9CT.png)

## Getting Started

Include the StrapConnect header file

```objective-c
#import <StrapConnect/StrapConnect.h>
```

(Optional) Implement the `ConnectDelegate` protocol

```objective-c

@interface AppDelegate : UIResponder <UIApplicationDelegate,ConnectDelegate>

@property (strong, nonatomic) Connect *connect;

@end
```

Initialize a `Connect` instance.  Here we assume the calling class is a `ConnectDelegate`.

```objective-c

// Initialize connect
self.connect = [[Connect alloc] initWithWriteToken:@"yourWriteToken" readToken:@"yourReadToken" guid:@"userGUID"];

// Whether to show confirmation dialog before loading platform list
[self.connect setShowDialog:YES];

// Root navigation controller to push service list controller onto
[self.connect setController:self.navigationController];

// Provide delegate to be notified of connected status
[self.connect setDelegate:self];
```

Launch AuthController to display platform list / allow user to connect a fitness device.

```objective-c
[self.connect launchAuthController];
```

Fetch the current user's latest aggregate fitness data.

```objective-c

// Fetch data
[_connect getDailyInfoWithCallback:^(NSDictionary *data, NSError *err) {
    // Using a block here as callback
}];
```

Should a user elect to disconnect a fitness device, perform the following.

```objective-c
[self.connect disconnect];
```

## Retrieve user activity

To retrieve activity for a user, follow the guidance in the <a href="/guides/connect-api">Connect API Reference</a>.
