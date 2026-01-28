# library management system
this is a library API bacckend for the management of users and the book

# Routes and the endpoints

## /users
GET: get all the list of all user in the system
POST:create/register a new user

## /users/{id}
GET: get a user by id
PUT: updating a user by their id
DELETE: deleting a user by their id(check if the user still has an issued book) &&(is there any fine/penalty to e collected)

## /users/subscription-details/{id}
GET: get a user subscription detail by their id
>>date of subscription
>>valid till?
>>fine if any?

## /books
GET: get all the books in the system
POST: add a new book to the system

## /books/{id}
GET: get a book by its id
PUT: update a book by its id
DELETE: delete a book by its id

## /books/issued
GET: get all the issued books

## /books/issued/withFine
GET: get all the book with their fine amount

### subscription type 
>> basics (3 months)
>>standard(6 months)
>>premium(12 months)

>>if a user  missed renewal date , then user should be collected with $100
>>if a user missed his subscription , then user is expected to pay $100
>> if  an user missed both renewal date and subscription date , then the amount to be collected is to be $200



## comands:
npm init
npm i express
npm i nodemon --save-dev

npm run dev

to restore node_modules and package-lock.json  npm i

npm i mongoose



npm i dotenv

## MVC Archietecture
    >>M:Model(Structure of our MongoDB)
    >>V:View(Frontend)
    >>C:Controller(Brain/Logic of a route)

## DTO(data transfer object)
