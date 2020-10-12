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

