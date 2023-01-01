<img src = "./client/public/assets/logo.png" style = "width: 100%; background-color:#000000;">

# Level Up

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Level Up is an online learning platform that an instructor can use to publish their courses and trainees can use to enrol in these courses to improve their knowledge and skills, also corporates can use it to train their employees and give them access to some learning material published on our website.

## Motivation

In the past decade people all around the world satrted heading for learning new skills through online learning platfrom and instructor started posting valuable learning materials all over the internet. The Main idea behind Level Up is to allow instructors to post the content from outside open sources and create a unified platform for online learning and that contains multiple materials from different sources.

## Features


- If you are an instructor , you can:
  - Create a course and sets its price.
  - Set promotions on your courses.
  - Upload the course content.
  - Add exercises to the course.
  - View their earnings each month.
  - See the number of enrolled trainees in each course.
  - See their ratings and reviews.
  - Search and view their courses.
  - Report any issue.
- If you are a trainee , you can:
  - Browse, search and filter all the courses published on the website.
  - View the details of any course.
  - See the trending courses.
  - Pay and enroll in a course.
  - View the content and solve the exercises of their enrolled courses.
  - Rate and review the courses they are enrolled in.
  - Rate and review the instructors of the courses they are enrolled in.
  - View the ratings and reviews of any course or instructor.
  - Report any issue.
  - Refund a course and get its amount back in their wallet.
- If you are a corporate trainee, you can:
  - Browse, search and filter all the courses published on the website.
  - View the details of any course.
  - See the trending courses.
  - Request access for a course.
  - View the content and solve the exercises of their enrolled courses.
  - Rate and review the courses they are enrolled in.
  - Rate and review the instructors of the courses they are enrolled in.
  - View the ratings and reviews of any course or instructor.
  - Report any issue.

# Code Style


The application is built in Client/Server architecture, where the server logic is written in `server` directory and the client is in `client` directory.

## Technology


Level Up uses a number of open source projects to work properly:

- [React](https://reactjs.org/) - Front-end
- [mui](https://mui.com/) - UI
- [React Bootstrap](https://react-bootstrap.github.io/) - UI
- [node.js] - Backend
- [Express] - Backend
- [MongoDB](https://www.mongodb.com/home) - Database

## Installation & Running


Install the dependencies and start the server.

```sh
cd client
npm i
cd ..
cd server
npm i
npm start
```

## API Refrence


### login

---

**request**:

```r
POST localhost:8080/login
```

**body**:

```json
{
  "username": "$username",
  "password": "$password"
}
```

**response**:

```json
{
  "userType": "admin | trainee | instructor | corporateTrainee",
  "userId": "$userId",
  "firstName": "$userFirstName",
  "lastName": "$userLastName",
  "userName": "$username",
  "corporateName": "corporateName" // if corporate trainee only
}
```

### Explore

---

Get the featured courses.
**request**:

```r
GET localhost:8080
```

**response**:

```json
[
  {
      "id": "$courseId",
      "price": "$price",
      "duration": "$duration",
      "instructorName": "$instructorInfo?.instructorName",
      "name": "$name",
      "subject": "$subject",
      "totalRating": "$totalRating",
      "ratingsCount": "$ratingsCount",
      "image": "imageURL"
    },
    {
      "id": "$courseId",
      ...
    }
    ...
]
```

### Sign Up

---

**request**:

```r
POST localhost:8080/signup
```

**body**:

```json
{ 
  "username": "$username",
  "password": "$password", 
  "email": "$email", 
  "gender": "$gender", 
  "firstName": "$firstName", 
  "lastName":"$lastName" 
}
```

**response**:

```json
{
  "userType": "trainee",
  "userId": "$userId",
  "firstName": "$userFirstName",
  "lastName": "$userLastName",
  "userName": "$username",
}
```

### Convert Currency

---

**request**:

```r
POST localhost:8080/convertCurrency
```

**body**:

```json
{
  "magnitude": "$magnitude",
  "oldCurrency": "$oldCurrency", 
  "newCurrency": "$newCurrency"
}
```

**response**:

```json
{
  "magnitude": "$newMagnitude",
  "currency": "$newCurrency",
}
```

### Search

---

**request**:

```r
POST localhost:8080/search
```

**body**:

```json
{ 
  "query": "$query"
}
```

**response**:

```json
[
  {
      "id": "$courseId",
      "price": "$price",
      "duration": "$duration",
      "instructorName": "$instructorInfo?.instructorName",
      "name": "$name",
      "subject": "$subject",
      "totalRating": "$totalRating",
      "ratingsCount": "$ratingsCount",
      "image": "imageURL"
    },
    {
      "id": "$courseId",
      ...
    }
    ...
]
```


### Reset Password

---

**request**:

```r
POST localhost:8080/resetPassword
```

**body**:

```json
{ 
  "userID": "$userID", 
  "token": "$token", 
  "confirmNewPassword": "$confirmNewPassword"
}
```


## Color Palette


The background used for the whole website is this gradient: linear-gradient(to top, #E6E9F0 0%, #EEF1F5 100%)

| Color                                                                             | Hex Code |
| --------------------------------------------------------------------------------- | -------- |
| <img src="https://www.colorhexa.com/100F0F.png" style="height:70px; width:120px"> | #100F0F  |
| <img src="https://www.colorhexa.com/297f87.png" style="height:70px; width:120px"> | #297F87  |
| <img src="https://www.colorhexa.com/9d9d9d.png" style="height:70px; width:120px"> | #9D9D9D  |
| <img src="https://www.colorhexa.com/ffffff.png" style="height:70px; width:120px"> | #FFFFFF  |

# Credits


This project is delivered by a group of 5 Engineering students at the German University in Cairo:

- [Ziad Ahmed Sadek](https://github.com/ziadsadek999)
- [Aya Ahmed Fayed](https://github.com/AyaFayed)
- [Aly Hassan Elsokkary](https://github.com/Elsokkary101)
- [Abdelrahman Fathy Elsalh](https://github.com/abd0123)
- [Ahmed Moneer Esmail](https://github.com/Itchyyy110)

with the help of all the amazing and supportive TAs and the great professor Dr. Mervat Abu-ElKheir.

# Contribute


If you want to cotribute to this project send us email on (onlinelearningsystem10@gmail.com). And if you have suggestion don't hesitate to open issue about it.

# License


This application is licensed under [MIT](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) License.

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[node.js]: http://nodejs.org
[express]: http://expressjs.com
