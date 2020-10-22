# e-commerce-server

Sample Test Case

----- Min Table -----

    PRODUCT
name -> string
img_url -> string
price -> decimal
stock -> integer

    USER
email -> string
password -> string
role -> default : customer (with hooks before create)


----- Success Test Cases -----
- CREATE Product 
- READ Product
- UPDATE Product
- DELETE Product
- Login


----- Failed Test Cases -----
- Login 
    -> Email valid, pass wrong
    -> Email isn't in database
    -> Not inserted email and password

- Create Product 
    -> No access_token
    -> access_token not admin
    -> Field aren't filled
    -> Stock is minus
    -> Price is minus
    -> Field filled with non correct types, ex stock with string instead of integer

- Update Product
    -> No access_token
    -> access_token not admin
    -> Stock is minus
    -> Price is minus
    -> Field filled with non correct types, ex stock with string instead of integer

- Delete Product 
    -> No access_token
    -> access_token not admin

**Home**
----
  Returns on a home page.

* **URL**

  /

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "Home": "This is homepage" }`
 
* **Error Response:**

* **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`



**Add New Products**
----
  Add New Products.

* **URL**

  /products

* **Method:**

  `POST`

* **Data Params**

  `name=[string]`
  `img_url=[string]`
  `description=[string]`
  `price = [integer]`
  `stock = [integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    '{
    "name": "Regenyei",
    "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
    "description": "A weapon",
    "price": 2000,
    "stock": 1
    }'
}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : Stock/Price must be more than 0 }`
  
  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`



**List Products**
----
  List json Products data.

* **URL**

  /products

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "product": [
    {
    "name": "Regenyei",
    "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
    "description": "A weapon",
    "price": 2000,
    "stock": 1
    }',
    {
    "name": "Regenyei",
    "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
    "description": "A weapon",
    "price": 2000,
    "stock": 1
    }'
    ]
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`



**Get Products by ID**
----
  Get Products data by id.

* **URL**

  /products/:id

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "product": [
        '{
    "name": "Regenyei",
    "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
    "description": "A weapon",
    "price": 2000,
    "stock": 1
    }'
    }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Error not Found" }`



**Edit Put Product**
----
  Edit Product by ID with all element updated.

* **URL**

  /products/:id

* **Method:**

  `PUT`

* **Data Params**
  `id=[integer]`
  `name=[string]`
  `img_url=[string]`
  `description=[string]`
  `price = [integer]`
  `stock = [integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** '{
    "name": "Regenyei",
    "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
    "description": "A weapon",
    "price": 2000,
    "stock": 1
    }'
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ validation error }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ validation error }`

  OR

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`



**Edit Patch Products**
----
  Edit Products by ID with some element updated.

* **URL**

  /products/:id

* **Method:**

  `PATCH`

* **Data Params**
  `id=[integer]`
  `name=[string]`
  `img_url=[string]`
  `description=[string]`
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** '{
    "name": "Regenyei",
    "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
    "description": "Sword",
    "price": 2000,
    "stock": 12
    }'
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : `[Name/Img_url/Price/Stock] cannot be [Empty/Null]` }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ validation error }`

  OR

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`



**Delete Put Products**
----
  Delete Products by ID.

* **URL**

  /products/:id

* **Method:**

  `DELETE`

* **Data Params**
  
  `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `msg : product success to delete`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error not found ! }`

  OR

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`



**Login User**
----
  Login User page.

* **URL**

  /users/login

* **Method:**

  `POST`


* **Data Params**

  `email=[string]`
  `password=[string]`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV0ZXJuYWwucHV0cmFAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTYwMTMwODEyM30.NkqvrEea2sqiQ07qFBShNvqSLo0qFx7hYiTYrSmd42k"
  }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Email/password wrong" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`


**Register User**
----
  Register New User Page.

* **URL**

  /users/register

* **Method:**

  `POST`


* **Data Params**

  `email=[string]`
  `password=[string]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
    "id": 6,
    "email": "something.putra@gmail.com"
  }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{
    "msg": "Key (email)=([@email.com]) already exists."
  }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are unauthorized to make this request." }`

**Cart**
----
  Add Cart Page.

* **URL**

  /cart

* **Method:**

  `POST`

* **Data Params**

  `ProductId=[integer]`
  `UserId=[integer]`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{
      "id": 2,
      "UserId": 2,
      "ProductId": 2,
      "amount": 1,
      "isPaid": false,
      "createdAt": "2020-10-21T08:25:41.866Z",
      "updatedAt": "2020-10-21T08:25:41.866Z",
      "Product": {
          "id": 2,
          "name": "Regenyei",
          "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
          "description": "A weapon",
          "price": 2000,
          "stock": 1,
          "createdAt": "2020-10-21T05:03:53.845Z",
          "updatedAt": "2020-10-21T05:03:53.845Z"
      }'

 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `"err": {
        "name": "Stock isn't enough"
    }`

  OR
  
  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`

**List Cart**
----
  List Cart data.

* **URL**

  /cart

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "cart": [
    {
        "id": 2,
        "UserId": 2,
        "ProductId": 2,
        "amount": 1,
        "isPaid": false,
        "createdAt": "2020-10-21T08:25:41.866Z",
        "updatedAt": "2020-10-21T08:25:41.866Z",
        "Product": {
            "id": 2,
            "name": "Regenyei",
            "img_url": "https://i1.wp.com/regenyei.com/wp-content/uploads/2020/04/KZ_1030_fechtschwert_05.jpg?resize=600%2C400&ssl=1",
            "description": "A weapon",
            "price": 2000,
            "stock": 1,
            "createdAt": "2020-10-21T05:03:53.845Z",
            "updatedAt": "2020-10-21T05:03:53.845Z"
        }
    },
    {
        "id": 3,
        "UserId": 2,
        "ProductId": 3,
        "amount": 1,
        "isPaid": false,
        "createdAt": "2020-10-21T08:25:54.059Z",
        "updatedAt": "2020-10-21T08:25:54.059Z",
        "Product": {
            "id": 3,
            "name": "Glove",
            "img_url": "https://www.ozactivesports.com.au/assets/full/GL03-yellow-M.jpg?20200704030455",
            "description": "Glove",
            "price": 4000,
            "stock": 2,
            "createdAt": "2020-10-21T05:03:53.845Z",
            "updatedAt": "2020-10-21T05:03:53.845Z"
        }
    },
    {
        "id": 4,
        "UserId": 2,
        "ProductId": 4,
        "amount": 10,
        "isPaid": false,
        "createdAt": "2020-10-21T09:27:37.040Z",
        "updatedAt": "2020-10-21T10:50:21.063Z",
        "Product": {
            "id": 4,
            "name": "Pike",
            "img_url": "https://cdn.globalauctionplatform.com/7845c05a-8e8f-4104-be58-a8cd00e79910/fbe0d694-12c4-4474-b54a-a8326deaae41/540x360.jpg",
            "description": "Spear",
            "price": 3000,
            "stock": 21,
            "createdAt": "2020-10-21T05:03:53.845Z",
            "updatedAt": "2020-10-21T05:03:53.845Z"
        }
    }
    ]
}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`


**Edit Patch Cart**
----
  Edit Cart by ID with some element updated.

* **URL**

  /cart/:id

* **Method:**

  `PATCH`

* **Data Params**
  `amount=[integer]`
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** '{
    "id": 4,
    "UserId": 2,
    "ProductId": 4,
    "amount": 10,
    "isPaid": false,
    "createdAt": "2020-10-21T09:27:37.040Z",
    "updatedAt": "2020-10-21T10:50:21.063Z"
    }'
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : `amount cannot be [Empty/Null]` }`

  OR

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ "msg": "JsonWebTokenError" }`

  OR

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`



**Delete Put Cart**
----
  Delete Cart by ID.

* **URL**

  /cart/:id

* **Method:**

  `DELETE`

* **Data Params**
  
  `id=[integer]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `msg : product success to delete`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error not found ! }`

  OR

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Internal Server Error }`
