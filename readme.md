Node Task 1 
    1- Clone repo into your github
    2- Use https://expressjs.com/
    3- Use this library to connect to mysql https://sequelize.org/
    4- Use this library https://github.com/stripe/stripe-php
    5- Use bootstrap 4 for ui
    6- Make the following page by end of day, no exceptions:

    / => show products from db table products (id, title, description, image, price)
    /product/:id => show product detail with image of product and title and description. Have a button buy now that open a modal for stripe checkout. Once checkout done, write into order table(id, product_id, total, stripe_id, status(paid, failed)). Show thank you page of purchase showing a table of product title, price, payment method


To run the project;

Backend:
1. cd backend && npm i
2. npm start

Frontend:
open the file products.html

Note: 
For the stripe I used direct charge method because for Product Mode I have to declare my products in Stripe account with all details and setup a pipeline for it, so I used direct charge option.