#  Welcome to bamazon!

Bamazon is a command line app that utilizes MySQL and node.js to create an Amazon-like storefront. Node modules required include inquirer, mysql, and cli-table2. These modules are included within the package.json and can be installed via npm init. The Bamazon database must also be created using the included mysql script before using bamazon..


This app has two role types for users - customer or manager. Users can access Bamazon via the customer role by using the bamazonCustomer.js file whereas the manager role is accessed using the bamazonManager.js file. See below for each role's functionality.

## Customer Role

Upon start up of the bamazonCustomer.js file, users are presented with a table of items for sale and their prices.

They will then be presented with two prompts:

1. The first prompt will ask the user to enter the id corresponding to the item they want to buy.
2. The second prompt will allow the user enter the number of units they want to buy for that item. 

If Bamazon has enough stock quantities to fulfill the order, the user will be presented with the total cost of their order. 
If not, then Bamazon will display a notification and will ask the user if they would like try to order again.

## Manager Role