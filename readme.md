# Project: Virtual-classroom Live
# Flow of work

1. Create admin user
2. Create teacher 
3. Create classroom
4. Create post
5. Add student into classroom


To understand easily, I have included all body empty. Hope anyone can just give input and able to test.
# 📁 Collection: Admin 


## End-point: Admin User Sign Up
To create a new user

1.  Enter user credentials like below body
2.  Add admin-secret value SECret$%&!@@@ in header
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/admin/sign-up
>```
### Headers

|Content-Type|Value|
|---|---|
|admin-secret|SECret$%&!@@@|


### Body (**raw**)

```json
{
    "username": "",
    "email": "",
    "password": "",
    "role": ""
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Users 


## End-point: User Login
To login as normal user

1.  Body must be filled email and password
2.  After filling email and password, just send request to api
3.  Keep the access token for further
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/user/login
>```
### Body (**raw**)

```json
{
    "email": "",
    "password": ""
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create teacher
To create teacher

1.  User must be admin to complete this
2.  Body(username,email,role) must be filled up
3.  After requesting to the api user will recieve a password by which they can log in
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/user/create
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json
{
    "username": "",
    "email": ",
    "role": ""
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Classroom 


## End-point: Create classroom
To create a classroom->

1.  A user must be teacher/admin
2.  Must include classname and subject like body
3.  Also must include auth-token and value of auth-token will be accessToken which was returned after succefully login
4.  Must store/save returned code number safely
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/create
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json
{
    "name": "",
    "subject": ""
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: End / deactivate specific classroom
To end a classroom

1.  We must have auth-token header
2.  User role must be teacher
3.  Must have classroom id
### Method: PUT
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/:classroomid/end
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To join classroom
To join a classroom

1.  We must have auth-token header
2.  User role must be student
3.  Must fill body like below, code is important
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/join
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json
{
    "code": "",
    "name": "",
    "schoolId": "",
    "password": "",
    "email": "" 
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To submit students result
To submit students result

1.  We must have auth-token header
2.  User role must be teacher
3.  On body must have student list, student list must be array, where there must be object like below
4.  Must include classroom id
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/:postid/submit/result
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json
{
    "student_list" : [
        {"student": "student_id", "grade": 3.5},
        {"student": "student_id", "grade": 3.8}
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get result list
To get result list

1.  We must have auth-token header
2.  User role must be student
3.  Must include classroom id
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/:classroomid/get/result-list
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body formdata

|Param|value|Type|
|---|---|---|
|||file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get classroom posts
To get classroom posts-> assignments/exams

1.  We must have auth-token header
2.  Must include classroom id
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/post/get-list/:classroomid
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get specific result for specific student
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/:classroomid/get/result/:studentid
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body formdata

|Param|value|Type|
|---|---|---|
|||file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get specific classroom upcoming assignments/exams
To get classroom posts-> assignments/exams

1.  We must have auth-token header
2.  Must include classroom id
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/:classroomid/upcoming/post
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get specific classroom information
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/:classroomid
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get all classroom list
To get all classroom

1.  Must have auth-token
2.  Role must be admin
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/list
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get classroom list generated created by specific teacher
To get all classroom

1.  Must have auth-token
2.  Role must be teacher/admin
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/teacher/generated
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get student list
To get all classroom

1.  Must have auth-token
2.  Role must be teacher/admin
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/classroom/:classroomid/student-list
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json

```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Exam / Assignment 


## End-point: To create post for classroom
To create post-> assignment/exam

1.  Must have auth-token
2.  Must fill all body fields like below
3.  It is requested to follow the same format for deadline and time
4.  Must include classroom id
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/post/create/62852117b7c7372e343b7b1d
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json
{
    "type": "",
    "deadline": "2022-06-12",
    "time": "10:08:00 AM",
    "name": ""
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To submit answer
To submit answer (assignment/exam)

1.  Must have auth-token
2.  Must use body->form-data
3.  Name of key must be answers which will be of type files (then just have to select files and upload)
4.  it is requested to include only images for current version
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/post/:postid/submit/answer
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body formdata

|Param|value|Type|
|---|---|---|
|answers||file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To submit students mark
To submit students result

1.We must have auth-token header  
2.User role must be teacher  
3.On body must have student list, student list must be array, where there must be object like below  
4.Must include post id
### Method: POST
>```
>https://strativ-virtual-classroom.herokuapp.com/api/post/:postid/submit/mark
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body (**raw**)

```json
{
    "student_list" : [
        {"student": "student_id", "mark": 25},
        {"student": "student_id", "mark": 35}
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get answer list
To get specific post answer list

1.We must have auth-token header  
2.User role must be teacher  
3.Must include post id
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/post/6291007b1dd1c64300139b37/get/answer-list
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body formdata

|Param|value|Type|
|---|---|---|
|||file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To get mark list
To get specific post mark list

1.We must have auth-token header  
2.User role must be student/teacher  
3.Must include post id as params
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/post/:postid/get/mark-list
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body formdata

|Param|value|Type|
|---|---|---|
|||file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: To Get specific student mark
To get specific post mark list

1.We must have auth-token header  
2.User role must be student/teacher  
3.Must include post id as params

4\. Must include student id as params
### Method: GET
>```
>https://strativ-virtual-classroom.herokuapp.com/api/post/:postid/get/mark/:studentid
>```
### Headers

|Content-Type|Value|
|---|---|
|auth-token||


### Headers

|Content-Type|Value|
|---|---|
|||


### Body formdata

|Param|value|Type|
|---|---|---|
|||file|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
