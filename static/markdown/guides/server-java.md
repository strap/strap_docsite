# Strap SDK > Server Side Java

Strap SDK Java provides an easy to use, chainable API for interacting with our API services. Its purpose is to abstract away resource information from our primary API, i.e. not having to manually track API information for your custom API endpoint.

Strap SDK Java keys off of a global API discovery object using the read token for the API. The Strap SDK Java extracts the need for developers to know, manage, and integrate the API endpoints.

The a Project API discovery can be found here:

HEADERS: "X-Auth-Token": GET https://api2.straphq.com/discover

Once the above has been fetched, strapSDK will fetch the API discover endpoint for the project and build its API.

### Installation
Download the following Jar, and include it as one of your project's libraries.
```
curl -O https://s3.amazonaws.com/strap-sdk/strap-sdk-java.jar
```
### Additionally Strap-SDK-Java depends on Google's Json library GSON. Obtain [the JAR](http://search.maven.org/#artifactdetails|com.google.code.gson|gson|2.3.1|jar) from Maven central.
```
http://search.maven.org/#artifactdetails|com.google.code.gson|gson|2.3.1|jar
```

### Usage
```java
  import com.strap.sdk.java.*;
  //
  // Project class definition goes here
  //
  // initialize Strap SDK with read token
  StrapSDK strap = new StrapSDK("Read-Token-Goes-Here");

  // fill map with url parameters and/or http request body key-value pairs
  Map<String, String> params = new HashMap<>();
  params.put("someKey", "someValue");

 if (strap.hasError()) {
     System.out.println(strap.error);
 } else {
   // make request for data based on params

    //"optional": 
    //  "guid",
    //  "page",
    //  "per_page"
   StrapReportList today = strap.getToday(params);
   System.out.println(today.data);
   System.out.println(today.error);

    //"optional":
    //  "guid",
    //  "page",
    //  "per_page"
   StrapReportList week = strap.getWeek(params);
   System.out.println(week.data);
   System.out.println(week.error);
   

    //"optional": 
    //  "guid",
    //  "page",
    //  "per_page"
   StrapReportList month = strap.getMonth(params);
   System.out.println(month.data);
   System.out.println(month.error);
   
   ArrayList<StrapReportList> mth = new ArrayList<>();
   mth.add(month);
   while (month.hasNext()) {
       mth.add(month.next());
   }
   System.out.println(mth);
   
   StrapReportList allMonth = strap.getMonth(params).getAll();
   System.out.println(allMonth);

   //"optional": 
   //   "platform",
   //   "count",
   //   "page",
   //   "per_page"
   StrapUserList users = strap.getUsers(params);
   System.out.println(users.data);
   System.out.println(users.error);
   
   StrapUserList allUsers = strap.getUsers(params).getAll();
   System.out.println(allUsers.data);
   
    // "required":"triggerId"
   StrapTrigger trigger = strap.getTrigger(params);
   System.out.println(trigger.data);
   System.out.println(trigger.error);
   
    //"required": "guid"
    //"optional":
    //  "date",
    //  "count",
    //  "start",
    //  "end"
   params.put("guid", "brian-fitbit");
   StrapReportList activities = strap.getActivity(params);
   System.out.println(activities.data);
   System.out.println(activities.error);
   
   //"required":"id"
   // params.put("id", "ID-GOES-HERE");
   StrapReport report = strap.getReport(params);
   System.out.println(report.data);
   System.out.println(report.error);
}
```
