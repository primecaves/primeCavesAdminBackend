# nodejs-crud-api
Node.js, Express and MongodB: Create a Restfull API with images upload

## What will you learn ?
What will you learn by downloading my code?
- Use of **express** to make API creation simple
- Using **mongoose** to manage communication with Mongo DB
- Image Upload with **multer**
- Image deletion with the notions of paths and file system in node
- Field validation using **express-validator**
- Creation of reusable methods thanks to the concept of **modules**
- Creation of a functional REST API with Node.js, Express and Mongo DB.

Are you ready ? Let's go

## Step 1: Installing dependencies

Clone the repository then run **npm install**

## Step 2: Link your api to Mongo DB

You can install mongodb locally or use Mongo Atlas (online). In both cases, go to the **app.js** file then replace the url **mongodb://localhost:27017/service-db** with your url. In my case I use Mongo DB locally. It is therefore available on port **27017**(by default) and the name of my database is **service-db**.

## Step 3: Launch your project

To launch your project, just type the following command : **node app.js**. Your API will therefore run on port 3000

## Step 4: Test the API endpoints

This is an API that manages services (football for example). A service is characterized by:
* name: the name of the service
* age: the service's age
* bio: a brief biography of the service (at least 15 characters)
* photoUrl: service photo
* createdAt and updatedAt are generated automatically using the **timestamps: true** statement in the **models/service.js file**

So we have a total of 5 routes

1. Add service http://localhost:3000/api/v1/service
2. List of all services http://localhost:3000/api/v1/services
3. Find service by Id http://localhost:3000/api/v1/service/:serviceId
4. Update service http://localhost:3000/api/v1/service/:serviceId
5. Delete service http://localhost:3000/api/v1/service/:serviceId

## Some precisions

* When you add a service their photo is placed in the /images folder (make sure to create this folder at the same level as the controllers folder if it doesn't exist).
* I delete service image if this image was replaced during the update (or if the service was deleted)
* In the utils/syd-functions.js folder you will find reusable functions in the controllers/service.js

## Examples of API tests with postman (in pictures)

* Add Service

<img src="https://i.ibb.co/TqTVxsn/add-service.png" alt="add-service" border="0">

* List of services
<img src="https://i.ibb.co/RSgvjLt/list-of-services.png" alt="list-of-services" border="0">

