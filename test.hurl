# Welcome Route (GET)
GET http://localhost:3200/api/
HTTP 200
[Asserts]
header "Content-Type" contains "text/html"


GET http://localhost:3200/api/getUser
HTTP 200

 #PUT http://localhost:3200/api/updateUser/1
#Content-Type: application/json

#{
#    "name": "Updated Jyoti",
#    "phNumber": "9233456701"
#}
#
#HTTP 200
#[Asserts]
#jsonpath "$.affectedRows" == 1


# # Create a New User (POST)
# POST http://localhost:3200/api/createUser
# Content-Type: application/json

# {
#     "name": "Jyoti",
#     "phNumber": "9233456701"
# }
# HTTP 200
# [Asserts]
# jsonpath "$.insertId" exists

# # Update User (PUT)
# PUT http:#localhost:3200/api/updateUser/1
# Content-Type: application/json

# {
#     "name": "Updated Jyoti",
#     "phNumber": "9876543210"
# }
# HTTP 200
# [Asserts]
# jsonpath "$.affectedRows" == 1

# # Delete User (DELETE)
# DELETE http://localhost:3200/api/deleteUser/1
# HTTP 200
# [Asserts]
# jsonpath "$.affectedRows" == 0
