# project-timelog-npm
an NPM module to track the time spent on a project

Includes information about all previous sessions where the user logged in and out. </br> </br>


Usage: </br>

```shell
$ install project-timelog
```

to log into a session using CLI: </br>
```shell
$ ./node_modules/.bin/project-timelog login
```
to lot out from a session using CLI: </br>
```shell
$ ./node_modules/.bin/project-timelog logout
```
to view the history of past sessions using CLI: </br>
```shell
$ ./node_modules/.bin/project-timelog history
```
(Would recommend setting up a script in package.json) </br> </br>

In the future: </br>
Looking to add functionality to log several users working on the same project and querying sessions by a specific user

