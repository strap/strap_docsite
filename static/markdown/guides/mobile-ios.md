# iOS > Strap Mobile SDK

# StrapConnect

Strap provides a universal cocoa touch framework for iOS applications to integrate the strap product offering into an existing mobile application.

### Demo App

We have a demo app avaialble for testing.  You can download it from: [https://s3.amazonaws.com/strap-libs/HealthMartDemo.zip](https://s3.amazonaws.com/strap-libs/HealthMartDemo.zip)

## Setup

1. Include in your app the HealthKit and the SafariServices frameworks (the last one should be linked as "Optional" to support iOS8 devices).
1. Download the framework bundle [https://s3.amazonaws.com/strap-libs/StrapConnect.zip](https://s3.amazonaws.com/strap-libs/StrapConnect.zip)
1. Unzip into your desired location, possibly within your application source.
1. Add to your build target.
  1. Select your build target
  1. Select "Build Phases"
  1. Expand "Link Binary With Libraries"
  1. Click "+" -> "Add Other"
  1. Navigate to and select "StrapConnect.framework"
  1. When finished, your build phases should be similar to the below
  ![](https://cldup.com/uGPeb5_9CT.png)

# Getting Started

If building against iOS9 SDK, using XCode 7, add these lines to your Info.plist file, to allow proper network handling

```xml
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSAllowsArbitraryLoads</key>
<true/>
</dict>
```

To properly handle third party services like FitBit, your app needs to handle the custom URL scheme strapconnect-<yourWriteToken>; To do so, add these lines to your Info.plist file (assuming your write token is 12341234123412345):


```xml
<key>CFBundleURLTypes</key>
  <array>
  <dict>
    <key>CFBundleTypeRole</key>
    <string>Editor</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>strapconnect-12341234123412345</string>
    </array>
  </dict>
</array>
```

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

Implement the openURL:sourceApplication:annotation: method to let StrapConnect handle the redirects when connecting to third party services like FitBit.

```objective-c
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
if ([[url scheme] rangeOfString:@"strapconnect"].location != NSNotFound) {
[self.connect openURL:url];
}
return YES;
}
```

Initialize a `Connect` instance.  Here we assume the calling class is a `ConnectDelegate`.
Permission is an array of health types to handle;
To properly manage overview and auth screen, is required that the controller object passed to the setController method is an instance of a UINavigationController.

```objective-c

// Initialize connect
self.connect = [[Connect alloc] initWithWriteToken:@"yourWriteToken" readToken:@"yourReadToken" guid:@"userGUID" permissions:@[HMPermissionTypeActivity, HMPermissionTypeBody, HMPermissionTypeFood, HMPermissionTypeSleep]];

// Whether to show confirmation dialog before loading platform list
[self.connect setShowDialog:YES];

// Root navigation controller to push service list controller onto
[self.connect setController:self.navigationController];

// Provide delegate to be notified of connected status
[self.connect setDelegate:self];

// Check if the user is already connected
if ([self.connect isUserConnected]) {
    ...
}
    
// Implement required delegate methods
- (void) onConnected {
    ...
}

- (void) onProfileUpdated {
    ...
}

- (void) onDisconnected {
    ...
}


```

Launch AuthController to display platform list / allow user to connect a fitness device; Some third party services, like FitBit, require their auth page to be opened in the external safari browser; In this case, the app will fire two delegate methods, onConnected when the user grants authorization to the service, and onProfileUpdated when the user has also filled the additional informations on the strap website.

The typical workflow is then to only update the app internal status within the onConnected method, leaving the auth screen open to show the additional profile page, and to close this screen only when the last onProfileUpdated call is received.

```objective-c
[self.connect launchAuthController];
```

Launch the Overview WebPage (to quickly show user data without writing custom implementation).

```objective-c
- (IBAction)showOverview:(id)sender {
UIViewController *c = [self.connect overviewViewController];
UINavigationController *nc = [[UINavigationController alloc] initWithRootViewController:c];
UIBarButtonItem *cancel = [[UIBarButtonItem alloc] initWithBarButtonSystemItem:UIBarButtonSystemItemCancel target:self action:@selector(closeOverview:)];
c.navigationItem.leftBarButtonItem = cancel;

[self presentViewController:nc animated:YES completion:nil];
}

- (IBAction)closeOverview:(id)sender {
[self dismissViewControllerAnimated:YES completion:nil];
}
```

Fetch the current user's latest aggregate fitness data by interval.

```objective-c

// Fetch data
[_connect getDailyInfoWithCallback:^(NSDictionary *data, NSError *err) {
    // Using a block here as callback
}];
```

```objective-c

// Fetch data
[_connect getWeeklyInfoWithCallback:^(NSDictionary *data, NSError *err) {
    // Using a block here as callback
}];
```

```objective-c

// Fetch data
[_connect getMonthlyInfoWithCallback:^(NSDictionary *data, NSError *err) {
    // Using a block here as callback
}];
```

Fetch activity for single day.

```objective-c
[_connect getActivityOnDate:@"2015-03-03" withCallback:^(NSArray *data, NSError *err) {
    // Do something with data
}];
```

Fetch activity for multiple days.

```objective-c
[_connect getActivityFromDate:@"2015-03-03" toDate:@"2015-03-08" withCallback:^(NSArray *data, NSError *err) {
    // Do something with data
}];
```

Should a user elect to disconnect a fitness device, perform the following.

```objective-c
[self.connect disconnect];
```

# Write data

Write sleep values
```objective-c
[self.connect writeSleepValueFromDate:self.sleepStartDate toDate:self.sleepEndDate withCallback:^(BOOL success, NSError *err) {
    }];
```

Write food values
```objective-c

NSArray *array = @[@{@"name": @"my favourite plate"},
@{@"type": HKQuantityTypeIdentifierDietaryEnergyConsumed, @"value": @"120", @"unit": @"cal"},
@{@"type": HKQuantityTypeIdentifierDietaryFatTotal, @"value": @"10", @"unit": @"g"},
@{@"type": HKQuantityTypeIdentifierDietaryProtein, @"value": @"50", @"unit": @"g"},
@{@"type": HKQuantityTypeIdentifierDietaryFiber, @"value": @"20", @"unit": @"g"},
@{@"type": HKQuantityTypeIdentifierDietarySodium, @"value": @"3", @"unit": @"g"}
];

[self.connect writeFoodCorrelationValue:array fromDate:self.foodDate toDate:self.foodDate withCallback:^(BOOL success, NSError *err) {
    }];
```

Write body values
```objective-c
NSArray *array = @[
@{@"type": HKQuantityTypeIdentifierBodyMassIndex, @"value": @"40", @"unit": @"count"},
@{@"type": HKQuantityTypeIdentifierBodyFatPercentage, @"value": @"25.0", @"unit": @"%"},
@{@"type": HKQuantityTypeIdentifierBodyMass, @"value": @"60", @"unit": @"lb"}
];

[self.connect writeBodyValues:array fromDate:[NSDate date] toDate:[NSDate date] withCallback:^(BOOL success, NSError *err) {
    }];

```

Write detailed food info
```objective-c
- (void)sendFoodInfo:(NSDictionary *)product withCallback:(void (^)(BOOL success)) cb;
```

Write workout values
```objective-c
- (void)sendWorkoutInfo:(NSDictionary *)workout withCallback:(void (^)(BOOL success)) cb;
```

# Search for a specific food

Autocomplete results while typing
```objective-c
- (void)foodSearchAutoComplete:(NSString *)term withCallback:(void (^)(BOOL success, NSString *term, NSArray *results))cb;
```

Search for a specific term
```objective-c
- (void)foodSearch:(NSString *)term withCallback:(void (^)(BOOL success, NSString *term, NSArray *results)) cb;
```

Get complete food details
```objective-c
- (void)foodInfo:(NSString *)itemId withCallback:(void (^)(BOOL success, NSString *itemId, NSDictionary *results)) cb;
```