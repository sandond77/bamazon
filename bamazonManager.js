var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table2')

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "falcon415",
	database: "bamazon_DB"
});

connection.connect(function(err){
	if (err) throw err;
})

function manager(){
	inquirer.prompt([
		{
			type: "list",
			name:"menu",
			message: "Welcome Manager. What would you like to do today?",
			choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]

		}
	]).then(function(response){
		if(response.menu === "View Products for Sale"){
			viewInventory();
		} else if (response.menu === "View Low Inventory"){
			lowInventory();
		} else if (response.menu === "Add to Inventory"){
			addInventory();
		} else if (response.menu === "Add New Product"){
			addProduct();
		}
	});
}

function viewInventory(){
	var read = connection.query("SELECT * FROM products", function(err,results){
		if (err) throw err;
		console.log("\n\nItems Inventory");
		console.log("----------------------------------");

		var table = new Table({
			head: ['id', 'Item', 'Price','Stock'],
		  	chars: { 'top': '' , 'top-mid': '' , 'top-left': ' ' , 'top-right': ' '
		         , 'bottom': '' , 'bottom-mid': ' ' , 'bottom-left': ' ' , 'bottom-right': ' '
		         , 'left': ' ' , 'left-mid': ' ' , 'mid': ' ' , 'mid-mid': ' '
		         , 'right': '' , 'right-mid': ' ' , 'middle': '│' },
		  	style: { 'padding-left': 0, 'padding-right': 0 }
		});

		for (var i = 0; i < results.length; i++) {
			table.push(
		   		[results[i].id, results[i].product_name, "$" + results[i].price, results[i].stock_quantity]
			);
		}
		console.log(table.toString());
		reset();
	});
}

function lowInventory(){
	var read = connection.query("SELECT * FROM products", function(err,results){
		if (err) throw err;
		console.log("\n\nItems With Low Inventory");
		console.log("----------------------------------");

		var table = new Table({
			head: ['id', 'Item', 'Price','Stock'],
		  	chars: { 'top': '' , 'top-mid': '' , 'top-left': ' ' , 'top-right': ' '
		         , 'bottom': '' , 'bottom-mid': ' ' , 'bottom-left': ' ' , 'bottom-right': ' '
		         , 'left': ' ' , 'left-mid': ' ' , 'mid': ' ' , 'mid-mid': ' '
		         , 'right': '' , 'right-mid': ' ' , 'middle': '│' },
		  	style: { 'padding-left': 0, 'padding-right': 0 }
		});

		for (var i = 0; i < results.length; i++) {
			if (results[i].stock_quantity < 5) {
				table.push(
		   			[results[i].id, results[i].product_name, "$" + results[i].price, results[i].stock_quantity]
				);
				var low = true;
			} 
		}

		if (low) {
			console.log(table.toString());;
			low = false;
			reset();
		} else {
			console.log("There are no items with low inventory");
			low = false;
			reset();
		}
	});
}

function addInventory(){
	var read = connection.query("SELECT * FROM products", function(err,results){
		if (err) throw err;
		console.log("\n\nItems Inventory");
		console.log("----------------------------------");

		var table = new Table({
			head: ['id', 'Item', 'Price','Stock'],
		  	chars: { 'top': '' , 'top-mid': '' , 'top-left': ' ' , 'top-right': ' '
		         , 'bottom': '' , 'bottom-mid': ' ' , 'bottom-left': ' ' , 'bottom-right': ' '
		         , 'left': ' ' , 'left-mid': ' ' , 'mid': ' ' , 'mid-mid': ' '
		         , 'right': '' , 'right-mid': ' ' , 'middle': '│' },
		  	style: { 'padding-left': 0, 'padding-right': 0 }
		});

		for (var i = 0; i < results.length; i++) {
			table.push(
		   		[results[i].id, results[i].product_name, "$" + results[i].price, results[i].stock_quantity]
			);
		}
		console.log(table.toString());
		add(results);
	});
}

function add(results){
	inquirer.prompt([
		{
			type: "input",
			name:"add",
			message: "Enter the Id of the item you would like to add more inventory to:",
			validate: function (input){
			   	var reg = /^\d+$/;
			   	if (input > results.length) {
			   		return ("That item ID does not exist");
			   	} else {
			   		return reg.test(input) || "Enter a valid ID a number!";  
			   	} 	
			}
		}
	]).then(function(response){
		inquirer.prompt([
			{
				type: "input",
				name:"quantity",
				message: "How many would you like to add?",
				validate: function (input){
				   	var reg = /^\d+$/;
				   	return reg.test(input) || "You did not enter a number!";
				}
			}
		]).then(function(response2){
			var order = parseInt(response.add);
			var quantity = parseInt(response2.quantity);
			var itemStock = results[order - 1].stock_quantity;
			var itemId = results[order - 1].id;

			connection.query("UPDATE products SET stock_quantity=stock_quantity + " + quantity + " WHERE id=" + itemId + ";", function(err,results){
				if (err) throw err;
				console.log("Stock Updated");
				viewInventory();
			});
		})
	})
}

function addProduct(){
	inquirer.prompt([
		{
			type: "input",
			message: "What do you want to sell?",
			name: "Item"
		},
		{
			type: "input",
			message: "Give it a department name",
			name: "department"
		},
		{
			type: "input",
			message: "Assign the item a price (in the format of 0.00)",
			name: "price",
			validate: function (input){
				   	var reg = /(\d+\.\d{1,2})/
				   	return reg.test(input) || "You did not enter it in the format shown!";
			}
		},
		{
			type: "input",
			message: "How much do we have in stock?",
			name: "stock",
			validate: function (input){
				   	var reg = /^\d+$/;
				   	return reg.test(input) || "You did not enter a number!";
			}
		}
	]).then(function(answers){
		var create = connection.query(
			"INSERT INTO products SET ?",
			{
				product_name: answers.Item,
				department_name: answers.department,
				price: answers.price,
				stock_quantity: answers.stock
			}
		);	
		console.log("\n\n Items Successfully added to inventory")
		viewInventory();
	})
}

function reset(){
	inquirer.prompt([
		{
			type: "confirm",
			name:"again",
			message: "Would you to do something else?",
			default: true
		}
	]).then(function(response3){
		if (response3.again) {
			manager()
		} else {
			console.log("Goodbye Manager. Closing connection to bamazon")
			connection.destroy();
		};
	});
}


manager()