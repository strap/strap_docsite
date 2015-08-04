# Strap API

## Authentication

To retrieve reports containing user data, you must pass a valid **read token** to any of our available API endpoints. To do this, set an HTTP header for ```x-auth-token``` equal to your **read token**. Because your project is associated with your **read token**, any project level API calls will use the token to determine the project id.

#### Example API call passing read token

```sh
$ curl "https://api2.straphq.com/users" --header "x-auth-token: abc123xyz"
```

## Activity
Get activity for a specified user by passing in the user's GUID.

```GET``` **https://api2.straphq.com/activity/{guid}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Yes |
| day | Which day you want data for (YYYY-MM-DD) | Today | No |
| count | The number of records you want returned | 500 | No |

#### Example Request

```sh
$ curl "https://api2.straphq.com/activity/asdf-q2er-z6cv-q67r?day=2015-01-01&count=1000" --header "x-auth-token: abc123xyz"
```

#### Example Response

```json
[{
    "id": "xyz123456789",
    "date": "2015-01-01",
    "timestamp": 1438622956683,
    "type": "jawbone",
    "guid": "asdf-q2er-z6cv-q67r",
    "activity": {
        "activeMinutes": 4,
        "calories": 66,
        "floors": 0,
        "nonactiveMinutes": 253,
        "steps": 1213,
        "updated": "January 1st 2015, 1:29:16 pm"
    },
    "food": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "avgfood": null,
    "body": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 0
    },
    "avgbody": null,
    "sleep": {
        "asleep": 0,
        "awake": 0,
        "duration": 0,
        "start": 0
    },
    "avgsleep": null,
    "average": {
        "activeMinutes": 0,
        "calories": 0,
        "floors": 0,
        "nonactiveMinutes": 0,
        "steps": 0,
        "updated": ""
    },
    "components": []
}]
```

## Behavior
Get user averages for a particular weekday.

```GET``` **https://api2.straphq.com/behavior/{guid}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Yes |
| weekday | Day of the week ("monday", "tuesday", etc) | Today | No |

#### Example Request
```sh
$ curl "https://api2.straphq.com/behavior/asdf-q2er-z6cv-q67r?weekday=tuesday" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
{
    "activity": {
        "activeMinutes": 7,
        "calories": 1029,
        "floors": 0,
        "nonactiveMinutes": 534,
        "steps": 2838,
        "updated": ""
    },
    "body": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 63
    },
    "date": "2015-07-21",
    "food": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "sleep": {
        "asleep": 1092,
        "awake": 5,
        "duration": 1097,
        "start": 1493
    },
    "timestamp": 1437496436041,
    "type": "tuesday"
}
```

## Job
Get, create, and delete segmentation jobs.

```GET``` **https://api2.straphq.com/job/{id}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| id | The job ID | | No |
| status | The job's status. Valid statuses include "open", "processing", and "done" | All | No |
| data | If provided, the segmentation data associated with this job will be returned instead. Requires id to be set. | | No |

#### Example Requests

```sh
$ curl "https://api2.straphq.com/job" --header "x-auth-token: abc123xyz"
$ curl "https://api2.straphq.com/job/123456789" --header "x-auth-token: abc123xyz"
$ curl "https://api2.straphq.com/job?status=done" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
[{
    "id": "oIRFvaciOCn63cn3D",
    "createdAt": "2015-08-03T15:17:01.489-04:00",
    "updatedAt": "2015-08-03T15:17:25.674-04:00",
    "name": "My Segmentation",
    "description": "From June 1st to August 1st.",
    "notificationUrl": "",
    "status": "done",
    "startDate": "2015-06-01",
    "endDate": "2015-08-01",
    "guids": [],
    "logs": [{
        "status": "open",
        "updatedAt": "2015-08-03T15:17:01.489-04:00"
    }, {
        "status": "processing",
        "updatedAt": "2015-08-03T15:17:18.081-04:00"
    }, {
        "status": "done",
        "updatedAt": "2015-08-03T15:19:02.007-04:00"
    }]
}]
```

<br/>
```POST``` **https://api2.straphq.com/job**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| name | The name of the job | | Yes |
| description | A description of the job | | No |
| guids | Array of user GUIDs | All | No |
| startDate | Start date of the reports to segment | Beginning of time | No |
| endDate | End date of the reports to segment | End of time | No |
| notificationURL | URL to notify when the job's status updates | | No |

#### Example Requests

```sh
$ curl "https://api2.straphq.com/job" -X POST -H "application/json" -d '{"name":"My Segmentation", "description": "From June 1st to August 1st.", "startDate": "2015-06-01", "endDate": "2015-08-01"}' -H "x-auth-token: abc123xyz"
$ curl "https://api2.straphq.com/job" -X POST -H "application/json" -d '{"name":"Another Segmentation", "description": "Specific GUID set", guids: ["abcd", "efgh", "ijkl"]}' -H "x-auth-token: abc123xyz"
```

#### Example Response
```json
{
    "id": "oIRFvaciOCn63cn3D",
    "createdAt": "2015-08-03T15:17:01.489507986-04:00",
    "updatedAt": "2015-08-03T15:17:01.489508153-04:00",
    "name": "My Segmentation",
    "description": "From June 1st to August 1st.",
    "notificationUrl": "",
    "status": "open",
    "startDate": "2015-06-01",
    "endDate": "2015-08-01",
    "guids": null,
    "logs": null
}
```

<br/>
```DELETE``` **https://api2.straphq.com/job/{id}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| id | The job ID | | Yes |

#### Example

```sh
$ curl "https://api2.straphq.com/job/123456789" -X DELETE --header "x-auth-token: abc123xyz"
```


## Month
Get all user month data by page or get user activity for month

```GET``` **https://api2.straphq.com/month**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Not if page specified |
| page | The page of data for month | | Not if guid specified |
| per_page | The number per page | | Not if guid specified |

#### Example Requests

```sh
$ curl "https://api2.straphq.com/month?guid=asdf-q2er-z6cv-q67r" --header "x-auth-token: abc123xyz"
$ curl "https://api2.straphq.com/month?page=5" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
[{
    "id": "xyz123456789",
    "date": "2015-08-31",
    "timestamp": 1438629481470,
    "type": "aggregate",
    "guid": "asdfqwe-asdfasd-asdfasdf",
    "activity": {
        "activeMinutes": 1107,
        "calories": 13021,
        "floors": 21,
        "nonactiveMinutes": 2232,
        "steps": 38040,
        "updated": "August 3 2015, 3:18:01 pm"
    },
    "food": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "avgfood": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "body": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 0
    },
    "avgbody": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 0
    },
    "sleep": {
        "asleep": 477,
        "awake": 6,
        "duration": 483,
        "start": 1414
    },
    "avgsleep": {
        "asleep": 477,
        "awake": 6,
        "duration": 483,
        "start": 1414
    },
    "average": {
        "activeMinutes": 369,
        "calories": 4340,
        "floors": 7,
        "nonactiveMinutes": 744,
        "steps": 12680,
        "updated": ""
    },
    "components": [{
        "activeMinutes": 93,
        "calories": 1917,
        "floors": 1,
        "nonactiveMinutes": 366,
        "steps": 1978,
        "updated": "August 3rd 2015, 3:16:53 pm"
    }, {
        "activeMinutes": 685,
        "calories": 6850,
        "floors": 12,
        "nonactiveMinutes": 755,
        "steps": 26816,
        "updated": "August 3rd 2015, 12:40:12 am"
    }, {
        "activeMinutes": 329,
        "calories": 4254,
        "floors": 8,
        "nonactiveMinutes": 1111,
        "steps": 9246,
        "updated": "August 2nd 2015, 9:09:16 am"
    }]
}]
```

## Report
Get a specific report by passing in the report id.

```GET``` **https://api2.straphq.com/report/{id}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| id | The report ID | | Yes |

#### Example Request

```sh
$ curl "https://api2.straphq.com/report/xyz123456789" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
{
    "id": "xyz123456789",
    "date": "2015-08-03",
    "timestamp": 1438630979502,
    "type": "jawbone",
    "guid": "asdfqwe-asdfasd-asdfasdf",
    "activity": {
        "activeMinutes": 21,
        "calories": 306,
        "floors": 0,
        "nonactiveMinutes": 434,
        "steps": 5459,
        "updated": "August 3rd 2015, 3:42:59 pm"
    },
    "food": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "avgfood": null,
    "body": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 77.1107029647
    },
    "avgbody": null,
    "sleep": {
        "asleep": 0,
        "awake": 0,
        "duration": 0,
        "start": 0
    },
    "avgsleep": null,
    "average": {
        "activeMinutes": 0,
        "calories": 0,
        "floors": 0,
        "nonactiveMinutes": 0,
        "steps": 0,
        "updated": ""
    },
    "components": [{
        "activeMinutes": 0,
        "calories": 0,
        "floors": 0,
        "nonactiveMinutes": 0,
        "steps": 0,
        "updated": ""
    }, {
        "activeMinutes": 14,
        "calories": 149,
        "floors": 0,
        "nonactiveMinutes": 0,
        "steps": 2754,
        "updated": "August 3rd 2015, 7:33:19 am"
    }, {
        "activeMinutes": 14,
        "calories": 162,
        "floors": 0,
        "nonactiveMinutes": 0,
        "steps": 3019,
        "updated": "August 3rd 2015, 8:17:11 am"
    }, {
        "activeMinutes": 14,
        "calories": 162,
        "floors": 0,
        "nonactiveMinutes": 15,
        "steps": 2984,
        "updated": "August 3rd 2015, 9:37:11 am"
    }, {
        "activeMinutes": 16,
        "calories": 208,
        "floors": 0,
        "nonactiveMinutes": 135,
        "steps": 3488,
        "updated": "August 3rd 2015, 10:55:05 am"
    }, {
        "activeMinutes": 21,
        "calories": 266,
        "floors": 0,
        "nonactiveMinutes": 200,
        "steps": 4728,
        "updated": "August 3rd 2015, 12:09:58 pm"
    }, {
        "activeMinutes": 21,
        "calories": 275,
        "floors": 0,
        "nonactiveMinutes": 241,
        "steps": 4862,
        "updated": "August 3rd 2015, 12:52:31 pm"
    }, {
        "activeMinutes": 21,
        "calories": 276,
        "floors": 0,
        "nonactiveMinutes": 258,
        "steps": 4877,
        "updated": "August 3rd 2015, 1:18:54 pm"
    }, {
        "activeMinutes": 21,
        "calories": 283,
        "floors": 0,
        "nonactiveMinutes": 322,
        "steps": 4979,
        "updated": "August 3rd 2015, 2:24:50 pm"
    }, {
        "activeMinutes": 21,
        "calories": 286,
        "floors": 0,
        "nonactiveMinutes": 332,
        "steps": 5072,
        "updated": "August 3rd 2015, 2:25:17 pm"
    }, {
        "activeMinutes": 21,
        "calories": 292,
        "floors": 0,
        "nonactiveMinutes": 415,
        "steps": 5206,
        "updated": "August 3rd 2015, 3:23:29 pm"
    }, {
        "activeMinutes": 21,
        "calories": 305,
        "floors": 0,
        "nonactiveMinutes": 434,
        "steps": 5436,
        "updated": "August 3rd 2015, 3:42:58 pm"
    }]
}
```

## Today
Get all user data today by page or get user activity for today

```GET``` **https://api2.straphq.com/today**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Not if page specified |
| page | The page of data for today | | Not if guid specified |
| per_page | The number per page | | Not if guid specified |

#### Example Requests

```sh
$ curl "https://api2.straphq.com/today?guid=asdf-q2er-z6cv-q67r" --header "x-auth-token: abc123xyz"
$ curl "https://api2.straphq.com/today?page=5" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
[{
    "id": "xyz123456789",
    "date": "2015-08-03",
    "timestamp": 1438622956683,
    "type": "jawbone",
    "guid": "asdf-q2er-z6cv-q67r",
    "activity": {
        "activeMinutes": 4,
        "calories": 66,
        "floors": 0,
        "nonactiveMinutes": 253,
        "steps": 1213,
        "updated": "August 3rd 2015, 1:29:16 pm"
    },
    "food": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "avgfood": null,
    "body": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 0
    },
    "avgbody": null,
    "sleep": {
        "asleep": 0,
        "awake": 0,
        "duration": 0,
        "start": 0
    },
    "avgsleep": null,
    "average": {
        "activeMinutes": 0,
        "calories": 0,
        "floors": 0,
        "nonactiveMinutes": 0,
        "steps": 0,
        "updated": ""
    },
    "components": []
}, {
    "id": "abc987654321",
    "date": "2015-08-03",
    "timestamp": 1438628941085,
    "type": "jawbone",
    "guid": "wxyz-a74d-291c-cz34",
    "activity": {
        "activeMinutes": 2,
        "calories": 39,
        "floors": 0,
        "nonactiveMinutes": 231,
        "steps": 465,
        "updated": "August 3rd 2015, 3:09:01 pm"
    },
    "food": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "avgfood": null,
    "body": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 0
    },
    "avgbody": null,
    "sleep": {
        "asleep": 0,
        "awake": 0,
        "duration": 0,
        "start": 0
    },
    "avgsleep": null,
    "average": {
        "activeMinutes": 0,
        "calories": 0,
        "floors": 0,
        "nonactiveMinutes": 0,
        "steps": 0,
        "updated": ""
    },
    "components": [{
        "activeMinutes": 1,
        "calories": 24,
        "floors": 0,
        "nonactiveMinutes": 60,
        "steps": 332,
        "updated": "August 3rd 2015, 11:16:07 am"
    }, {
        "activeMinutes": 1,
        "calories": 35,
        "floors": 0,
        "nonactiveMinutes": 92,
        "steps": 431,
        "updated": "August 3rd 2015, 11:16:07 am"
    }]
}]
```
## Trigger
Get a specific trigger by passing in the trigger id.

```GET``` **https://api2.straphq.com/trigger/{id}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| id | The trigger ID | | Yes |

#### Example Request

```sh
$ curl "https://api2.straphq.com/trigger/my-trigger" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
{
    "trigger": "my-trigger",
    "users": [{
        "guid": "asdf-q2er-z6cv-q67r",
        "report": "xyz123456789"
    }, {
        "guid": "wxyz-a74d-291c-cz34",
        "report": "abc987654321"
    }]
}
```

## User
Get user details for your project.

```GET``` **https://api2.straphq.com/user/{guid}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Yes |

#### Example Request

```sh
$ curl "https://api2.straphq.com/user/asdf-q2er-z6cv-q67r" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
{
    "gender": "male",
    "guid": "asdf-q2er-z6cv-q67r",
    "platform": "jawbone"
}
```


## Users
Get all users for your project.

```GET``` **https://api2.straphq.com/users**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| platform | The specific platform a user has connected with (fitbit,jawbone)| All | No |
| count | The number of records you want returned | 500 | No |

#### Example Request

```sh
$ curl "https://api2.straphq.com/users?platform=fitbit&count=1000" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
[{
    "guid": "asdf-q2er-z6cv-q67r",
    "platform": "fitbit"
}, {
    "guid": "wxyz-a74d-291c-cz34",
    "platform": "fitbit"
}]
```

## Week
Get all user week data by page or get user activity for week

```GET``` **https://api2.straphq.com/week**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Not if page specified |
| page | The page of data for week | | Not if guid specified |
| per_page | The number per page | | Not if guid specified |

#### Example Requests

```sh
$ curl "https://api2.straphq.com/week?guid=asdf-q2er-z6cv-q67r" --header "x-auth-token: abc123xyz"
$ curl "https://api2.straphq.com/week?page=5" --header "x-auth-token: abc123xyz"
```

#### Example Response
```json
{
    "id": "xyz123456789",
    "date": "2015-08-08",
    "timestamp": 1438662505892,
    "type": "aggregate",
    "guid": "asdf-q2er-z6cv-q67r",
    "activity": {
        "activeMinutes": 5,
        "calories": 88,
        "floors": 0,
        "nonactiveMinutes": 887,
        "steps": 1694,
        "updated": "August 4 2015, 12:28:25 am"
    },
    "food": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "avgfood": {
        "calories": 0,
        "carbs": 0,
        "fat": 0,
        "fiber": 0,
        "protein": 0,
        "sodium": 0,
        "water": 0
    },
    "body": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 0
    },
    "avgbody": {
        "bmi": 0,
        "bodyFat": 0,
        "weight": 0
    },
    "sleep": {
        "asleep": 0,
        "awake": 0,
        "duration": 0,
        "start": 0
    },
    "avgsleep": {
        "asleep": 0,
        "awake": 0,
        "duration": 0,
        "start": 0
    },
    "average": {
        "activeMinutes": 2,
        "calories": 44,
        "floors": 0,
        "nonactiveMinutes": 443,
        "steps": 847,
        "updated": ""
    },
    "components": [{
        "activeMinutes": 5,
        "calories": 82,
        "floors": 0,
        "nonactiveMinutes": 535,
        "steps": 1560,
        "updated": "August 3rd 2015, 5:50:47 pm"
    }, {
        "activeMinutes": 0,
        "calories": 6,
        "floors": 0,
        "nonactiveMinutes": 352,
        "steps": 134,
        "updated": "August 3rd 2015, 1:29:14 pm"
    }]
}
```
