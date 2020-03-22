# ecommerce-server

**registration**
----
register user


* **URL**

  /user/register

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
       {
    "message": "Register Success",
    "name": "mario",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAsIm5hbWUiOiJtYXJpbyIsImVtYWlsIjoibUBtYWlsLmNvbSIsImFnZSI6MjEsImdlbmRlciI6Im1hbGUiLCJiaW8iOiJhaG95eSIsImlhdCI6MTU4NDg5OTczN30.qX454Y5lVIJxjBLupaE6YIUJoSHXEivOYJh6E05guw0"
      }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Login**
----
login user


* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        {
    "message": "Register Success",
    "name": "mario",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjAsIm5hbWUiOiJtYXJpbyIsImVtYWlsIjoibUBtYWlsLmNvbSIsImFnZSI6MjEsImdlbmRlciI6Im1hbGUiLCJiaW8iOiJhaG95eSIsImlhdCI6MTU4NDg5OTczN30.qX454Y5lVIJxjBLupaE6YIUJoSHXEivOYJh6E05guw0"
    }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`



**Title**
----
  get all event
  
  *ini yg buat di home bob

* **URL**

  /events

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": [list of events]
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
  get one event

  *kl event di klik/event detail

* **URL**

  /events/:id

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
       {
    "id": 43,
    "name": "naik gunung",
    "location": null,
    "statusEvent": "pending",
    "UserId": 59,
    "description": "temenin ke kondangan mantan",
    "date": "2020-07-24T00:00:00.000Z",
    "numOfRent": 1,
    "createdAt": "2020-03-22T17:46:43.199Z",
    "updatedAt": "2020-03-22T17:46:43.199Z",
    "Users": [
        {
            "id": 59,
            "name": "hai",
            "email": "h@mail.com",
            "password": "$2a$10$CCui6Fqgx4ZCNaOIoPLKUu46UaYroY2ViG21SsHDPeHyAijhCzeWS",
            "age": 21,
            "gender": "male",
            "bio": "ahoyy",
            "profilePicture": null,
            "createdAt": "2020-03-22T17:29:15.668Z",
            "updatedAt": "2020-03-22T17:29:15.668Z",
            "UserEvent": {
                "UserId": 59,
                "EventId": 43,
                "statusApplicant": true,
                "statusPayment": false,
                "payment": 200000,
                "date": "2020-07-17T00:00:00.000Z",
                "createdAt": "2020-03-22T17:47:21.900Z",
                "updatedAt": "2020-03-22T17:54:58.450Z"
            }
        },
        {
            "id": 60,
            "name": "mario",
            "email": "m@mail.com",
            "password": "$2a$10$rrVIZymc8WwTerMGMKfx0uU4k1RR3GrycRruM8o8FpGFD9DPEGtJ6",
            "age": 21,
            "gender": "male",
            "bio": "ahoyy",
            "profilePicture": null,
            "createdAt": "2020-03-22T17:55:37.055Z",
            "updatedAt": "2020-03-22T17:55:37.055Z",
            "UserEvent": {
                "UserId": 60,
                "EventId": 43,
                "statusApplicant": true,
                "statusPayment": false,
                "payment": 200000,
                "date": "2020-07-17T00:00:00.000Z",
                "createdAt": "2020-03-22T17:56:08.188Z",
                "updatedAt": "2020-03-22T17:56:24.477Z"
            }
        }
    ]
    }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
  create new event 

* **URL**

  /events/:id
  

  * **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
    `headers: access_token`
    *perlu token ya ini
   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        {
    "id": 43,
    "name": "naik gunung",
    "statusEvent": "pending",
    "description": "temenin ke kondangan mantan",
    "date": "2020-07-24T00:00:00.000Z",
    "numOfRent": 3,
    "UserId": 59,
    "updatedAt": "2020-03-22T17:46:43.199Z",
    "createdAt": "2020-03-22T17:46:43.199Z",
    "location": null
    }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`



**Title**
----
  delete event

* **URL**

  /events/:id

  * **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
    `headers: access_token`
    *ini juga perlu token

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { n: 1, ndeleted: 1, ok: 1 }
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`


**Title**
----
  update event

* **URL**

  /product/:id

  * **Method:**

  `put`
  
*  **URL Params**


   **Required:**
 
    `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        [
    1,
    [
        {
            "id": 43,
            "name": "jadi kondangan",
            "location": null,
            "statusEvent": "pending",
            "UserId": 59,
            "description": "temenin ke kondangan mantan",
            "date": "2020-07-24T00:00:00.000Z",
            "numOfRent": 1,
            "createdAt": "2020-03-22T17:46:43.199Z",
            "updatedAt": "2020-03-22T18:40:59.482Z"
        }
    ]
    ]
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`


**Title**
----
  create UserEvent
  *ini di hit waktu applicant apply

* **URL**

  /userEvent/

  * **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
    `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
              {
    "UserId": 60,
    "EventId": 43,
    "statusApplicant": false,
    "statusPayment": false,
    "payment": 200000,
    "date": "2020-07-18T00:00:00.000Z",
    "updatedAt": "2020-03-22T18:20:28.841Z",
    "createdAt": "2020-03-22T18:20:28.841Z",
    "id": 82
    }
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
  get one UserEvent
  *ini buat liat daftar user yg apply di event itu
  *id event nya kirim lwt params

* **URL**

  /userEvent/:EventId

  * **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
    `headers: token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
           [
    {
        "UserId": 59,
        "EventId": 43,
        "statusApplicant": true,
        "statusPayment": false,
        "payment": 200000,
        "date": "2020-07-17T00:00:00.000Z",
        "createdAt": "2020-03-22T17:47:21.900Z",
        "updatedAt": "2020-03-22T17:54:58.450Z",
        "User": {
            "id": 59,
            "name": "hai",
            "email": "h@mail.com",
            "password": "$2a$10$CCui6Fqgx4ZCNaOIoPLKUu46UaYroY2ViG21SsHDPeHyAijhCzeWS",
            "age": 21,
            "gender": "male",
            "bio": "ahoyy",
            "profilePicture": null,
            "createdAt": "2020-03-22T17:29:15.668Z",
            "updatedAt": "2020-03-22T17:29:15.668Z"
        },
        "Event": {
            "id": 43,
            "name": "jadi kondangan",
            "location": null,
            "statusEvent": "pending",
            "UserId": 59,
            "description": "temenin ke kondangan mantan",
            "date": "2020-07-24T00:00:00.000Z",
            "numOfRent": 1,
            "createdAt": "2020-03-22T17:46:43.199Z",
            "updatedAt": "2020-03-22T18:40:59.482Z"
        }
    },
    {
        "UserId": 60,
        "EventId": 43,
        "statusApplicant": true,
        "statusPayment": false,
        "payment": 200000,
        "date": "2020-07-17T00:00:00.000Z",
        "createdAt": "2020-03-22T17:56:08.188Z",
        "updatedAt": "2020-03-22T17:56:24.477Z",
        "User": {
            "id": 60,
            "name": "mario",
            "email": "m@mail.com",
            "password": "$2a$10$rrVIZymc8WwTerMGMKfx0uU4k1RR3GrycRruM8o8FpGFD9DPEGtJ6",
            "age": 21,
            "gender": "male",
            "bio": "ahoyy",
            "profilePicture": null,
            "createdAt": "2020-03-22T17:55:37.055Z",
            "updatedAt": "2020-03-22T17:55:37.055Z"
        },
        "Event": {
            "id": 43,
            "name": "jadi kondangan",
            "location": null,
            "statusEvent": "pending",
            "UserId": 59,
            "description": "temenin ke kondangan mantan",
            "date": "2020-07-24T00:00:00.000Z",
            "numOfRent": 1,
            "createdAt": "2020-03-22T17:46:43.199Z",
            "updatedAt": "2020-03-22T18:40:59.482Z"
        }
    },
    
  ]
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
  edit applicant's payment
  *ini buat edit statuspayment (setelah barcode di scan)
  *juga kl user mau edit harga jasa/payment
  *di sesuain payload aja
* **URL**

  /userEvent/payments/:EventId

  * **Method:**

  `PUT`
  
*  **URL Params**


   **Required:**
 
    `headers: token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
                "OK,
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`



**Title**
----
  edit applicant's status
  *ini di hit kl creator event acc applicants nya
  
* **URL**

  /userEvent/payments/:EventId

  * **Method:**

  `PUT`
  
*  **URL Params**


   **Required:**
 

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
                [
    2,
    [
        {
            "id": 81,
            "UserId": 60,
            "EventId": 43,
            "statusApplicant": true,
            "statusPayment": false,
            "payment": 200000,
            "createdAt": "2020-03-22T17:56:08.188Z",
            "updatedAt": "2020-03-22T19:01:29.441Z",
            "date": "2020-07-17T00:00:00.000Z"
        },
        {
            "id": 82,
            "UserId": 60,
            "EventId": 43,
            "statusApplicant": true,
            "statusPayment": false,
            "payment": 200000,
            "createdAt": "2020-03-22T18:20:28.841Z",
            "updatedAt": "2020-03-22T19:01:29.441Z",
            "date": "2020-07-18T00:00:00.000Z"
        }
    ]
  ]
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       {
    "status": "onGoing",
    "message": "you already have enough people"
    }
        }`


**Title**
----
  delete UserEvent
  *di hit kl di declined sama creator
  *yg dikirim di params ID dari UserEvent nya
  *bukan EventId atau UserId!

* **URL**

  /useEvent/:id

  * **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
    `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
                1
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

