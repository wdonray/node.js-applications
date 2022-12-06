# REST API
*Representational State Transfer - Application Programming Interface (REST API or RESTful API)*

- An API is nothing more than a set of tools that allows you to build applications. Node provides us with API's. 
- The REST API allows clients such as a web application to access and manipulate resources using a set of predefined operations.
  - Resource Example: A user or a task
  - Predefined Operations: CRUD (Create / Read / Update / Delete)
- These operations are generally access via HTTP requests.
- Now when it comes to state transfer, a REST API server, is stateless, the state has been transferred from the server to the client.
  - So each request from the client such as a request from a web application, contains everything needed for the server to actually process that request.
  - This includes the operation they're trying to perform, all of the data the operation actually needs in order to work.
  - It also includes things like authentication making sure that the user who's trying to perform the operation, is actually able to do so.

### Example

__Client__: Hey, I need task data to show. I will use the GET HTTP request to make a request to the server. 

__Client__ ⇨ ( __GET__: <u>/task/:id</u> ) ⇨ __Server__

__Server__: I have found it in the database.

__Server__ ⇨ ( __200__: <u>JSON Response</u> ) ⇨ __Client__

_200 is a status code that indicates everything is okay_

### Resource Example (Task)

__Create__ | POST /tasks

__Read__ | GET /tasks
__Read__ | GET /tasks/:id

__Update__ | PATCH /tasks/:id

__Delete__ | DELETE /tasks/:id

### Request Example
```JSON
POST /task HTTP/1.1
Accept: application/json
Connection: Keep-Alive
Authorization: Bearer :token

{ "description:" "Order new drill bits" }
```

### Response Example
```JSON
HTTP/1.1 201 Created
Date: Wed, 30 Nov 2022 15:58:37 CST
Server: Express
Content-Type: application/json

{ "id:" ":id", "description:" "Order new drill bits", "completed:" false }
```