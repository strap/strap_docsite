# Notifications

## Trigger & Notification Overview

Triggers are setup in the <a href="https://console.straphq.com" target="_blank">Strap Console</a> for your project.  Each trigger is assigned a set of criteria that will be evaluated against the information coming into the Strap system for each user.

Notifications provide the ability for your application to receive real-time push alerts that a user or set of users have met the criteria of your trigger.  

The Trigger notification is delivered as a JSON-based POST from our servers to the Notification URL specified for each trigger.  The Notification URL should respond immediately with a 200 and process the trigger  POST information following the 200 response.

### Example Notifiction POST

```POST``` **https://example.com/triggers**

#### POST Body
```
{
    "trigger": "key-of-trigger", // Trigger Key
    "triggerID": "qwesdf23f",    // Strap Trigger ID
    "projectId": "wewfesdqwer",  // Strap Project ID
    "users": [{
            "guid": "qwersd-wddfadfasd", // User GUID
            "report": "r78urtjhbsef" // Report ID 
        }, {
            "guid": "ryujh-65798itrhgsd", // User GUID
            "report": "r67igfhndsfg" // Report ID
        }]
}

```