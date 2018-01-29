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


function customer(){
	var read = connection.query("SELECT * FROM products", function(err,results){
		if (err) throw err;
		console.log("\n\nItems For Sale");
		console.log("----------------------------------");

		var table = new Table({
			head: ['id', 'Item', 'Price'],
		  	chars: { 'top': '' , 'top-mid': '' , 'top-left': ' ' , 'top-right': ' '
		         , 'bottom': '' , 'bottom-mid': ' ' , 'bottom-left': ' ' , 'bottom-right': ' '
		         , 'left': ' ' , 'left-mid': ' ' , 'mid': ' ' , 'mid-mid': ' '
		         , 'right': '' , 'right-mid': ' ' , 'middle': '│' },
		  	style: { 'padding-left': 0, 'padding-right': 0 }
		});

		for (var i = 0; i < results.length; i++) {
			table.push(
		   		[results[i].id, results[i].product_name, "$" + results[i].price]
			);
		}
		console.log(table.toString());
		order(results);
	});
}

function order(results){
	inquirer.prompt([
		{
			type: "input",
			name:"order",
			message: "Enter the Id of the item you would like to order:"
		}
	]).then(function(response){
		inquirer.prompt([
			{
				type: "input",
				name:"quantity",
				message: "How many would you like to order?"
			}
		]).then(function(response2){
			console.log(results.length)
			var order = parseInt(response.order);
			var quantity = parseInt(response2.quantity);
			var itemStock = results[order + 1].stock_quantity;
			var itemId = results[order + 1].id
			var orderItemPrice = (results[order - 1].price);

			if (itemStock  > quantity) {
				console.log("Order Received")
				connection.query("UPDATE products SET stock_quantity=stock_quantity - " + quantity + " WHERE id=" + results[order-1].id , function(err,results){
					if (err) throw err;
					var cost = quantity * orderItemPrice ;
					console.log("Your total cost is: $" + cost);
				});

			} else {
				console.log("Sorry, we do not have enough to stock to complete your order.")
			}
		})
	})
}		

customer();
