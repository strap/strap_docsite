# API > Retrieving User Data

## Authentication

To retrieve reports containing user data, you must pass a valid **read token** to any of our available API endpoints. To do this, set an HTTP header for ```x-auth-token``` equal to your **read token**. Because your project is associated with your **read token**, any project level API calls will use the token to determine the project id.

#### Example API call passing read token

```sh
$ curl https://api.straphq.com/users --header "x-auth-token: abc123xyz"
```

## Activity
Get activity for a specified user by passing in the user's GUID.

```GET``` **https://api.straphq.com/activity/{guid}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Yes |
| day | Which day you want data for (YYYY-MM-DD) | Today | No |
| count | The number of records you want returned | 500 | No |

#### Example

```sh
$ curl https://api.straphq.com/activity/asdf-q2er-z6cv-q67r?day=2015-0101&count=1000 --header "x-auth-token: abc123xyz"
```

## Month
Get all user month data by page or get user activity for month

```GET``` **https://api.straphq.com/month**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Not if page specified |
| page | The page of data for month | | Not if guid specified |
| per_page | The number per page | | Not if guid specified |

#### Example

```sh
$ curl https://api.straphq.com/month?guid=asdf-q2er-z6cv-q67r --header "x-auth-token: abc123xyz"
$ curl https://api.straphq.com/month?page=5 --header "x-auth-token: abc123xyz"
```

## Report
Get a specific report by passing in the report id.

```GET``` **https://api.straphq.com/report/{id}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| id | The report ID | | Yes |

#### Example

```sh
$ curl https://api.straphq.com/report/asdf-adsf --header "x-auth-token: abc123xyz"
```

## Today
Get all user data today by page or get user activity for today

```GET``` **https://api.straphq.com/today**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Not if page specified |
| page | The page of data for today | | Not if guid specified |
| per_page | The number per page | | Not if guid specified |

#### Example

```sh
$ curl https://api.straphq.com/today?guid=asdf-q2er-z6cv-q67r --header "x-auth-token: abc123xyz"
$ curl https://api.straphq.com/today?page=5 --header "x-auth-token: abc123xyz"
```

## Trigger
Get a specific trigger by passing in the trigger id.

```GET``` **https://api.straphq.com/trigger/{id}**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| id | The trigger ID | | Yes |

#### Example

```sh
$ curl https://api.straphq.com/trigger/asdf-adsf --header "x-auth-token: abc123xyz"
```

## Users
Get all users for your project.

```GET``` **https://api.straphq.com/users**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| platform | The specific platform a user has connected with (fitbit,jawbone)| All | No |
| count | The number of records you want returned | 500 | No |

#### Example

```sh
$ curl https://api.straphq.com/users?platform=fitbit&count=1000 --header "x-auth-token: abc123xyz"
```

## Week
Get all user week data by page or get user activity for week

```GET``` **https://api.straphq.com/week**

#### Params

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Not if page specified |
| page | The page of data for week | | Not if guid specified |
| per_page | The number per page | | Not if guid specified |

```sh
$ curl https://api.straphq.com/week?guid=asdf-q2er-z6cv-q67r --header "x-auth-token: abc123xyz"
$ curl https://api.straphq.com/week?page=5 --header "x-auth-token: abc123xyz"
```
