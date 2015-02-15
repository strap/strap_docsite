# Retrieving User Data

## Getting Started

### Authentication

To retrieve reports containing user data, you must pass a valid **read token** to any of our available API endpoints. To do this, set an HTTP header for ```x-auth-token``` equal to your **read token**. Because your project is associated with your **read token**, any project level API calls will use the token to determine the project id. 

#### Example API call passing read token

```sh
curl https://api.straphq.com/users --header "x-auth-token: abc123xyz"
```

## API Endpoints

### Activity
Get activity for a specified user by passing in the user's GUID.

```GET``` **https://api.straphq.com/activity/{guid}**

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Yes |
| day | Which day you want data for (YYYY-MM-DD) | Today | No |
| count | The number of records you want returned | 500 | No |

### Report
Get a specific report by passing in the report id.

```GET``` **https://api.straphq.com/report/{id}**

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| id | The report ID | | Yes |

### Today
Get all user data today by page or get user activity for today

```GET``` **https://api.straphq.com/today**

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| guid | The user's GUID | | Not if page specified |
| page | The page of data for today | | Not if guid specified |

### Users
Get all users for your project.

```GET``` **https://api.straphq.com/users**

| **Param** | **Description** | **Default** | **Required** |
| :--- | --- | ---: | ---: |
| platform | The specific platform a user has connected with (fitbit,jawbone)| All | No |
| count | The number of records you want returned | 500 | No |
