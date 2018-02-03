#  Welcome to bamazon!
Bamazon is a command line app that utilizes MySQL and node.js to create an Amazon-like storefront. 

Node modules required include:
1. inquirer
2. mysql
3. cli-table2. 

These modules are included within the package.json and can be installed via npm init. The Bamazon database must also be created using the included mysql script before using bamazon..

This app has two role types for users - customer or manager. Users can access Bamazon via the customer role by using the bamazonCustomer.js file whereas the manager role is accessed using the bamazonManager.js file. See below for each role's functionality.



## Customer Role
The first half of this video provides a tutorial of the customer role. 
https://www.youtube.com/watch?v=xlvHJC_18wI


Upon start up of the bamazonCustomer.js file, users are presented with a table of items for sale and their prices.

They will then be presented with two prompts:

1. Enter the id corresponding to the item they want to buy.
2. Enter the number of units desired. 

If Bamazon has enough stock quantities to fulfill the order, the user will be presented with the total cost of their order. 
If not, then Bamazon will display a notification and will ask the user if they would like try to order again.



## Manager Role
Upon start up of the bamazonManger.js file, users are presented with set of menu options:

1. View Products for Sale
2. View Low Inventory
3. Add to Inventory
4. Add New Product

#### View Products for Sale
Selection of this option will provide the user with a table containing items for sale and their stock levels. 

#### View Low Inventory
Selection of this option will provide the user with a table containing items that are low stock (having less than 5 units remaining).
If there are no stock items, then another message will appearing stating that nothing is low.

#### Add to Inventory
Selection of this option will provide the user with a table containing items for sale and their stock levels. 

Two prompts will then appear:
1. Enter the Id of the item
2. How many units should be added to that item's stock levels

The mysql database will then be updated and a table with the updated stock levels will be presented.

#### Add New Product

