# Personal time and progress bar wrapper

---

Personal time and progress bar front is a trainee project that synchronize with todoist.com and show what tasks status is.

# Environment
Personal time and progress bar front uses:
 - Java 11 
 - Maven 3.0.
 - Spring Boot 2
 - Vue.js
 - Axios.js
 - Bootstrap
 
Environment:
 - PtpbHandler
 - PtpbWrapper

# Building from sources
For production release run following commands:

```sh
$ mvn package
```

# Installation

Once building from sources is done and environment is running then start the application with using following commands:

```sh
$ java -jar ptpb-front-1.0-SNAPSHOT.jar --spring.config.location=../config/ --spring.profiles.active=prod --loging.config=../config/logback.xml
```

----
