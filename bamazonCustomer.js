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


function availableItems(){
	var read = connection.query("SELECT id, product_name, price FROM products", function(err,results){
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
	});
}

availableItems();


// inquirer.prompt([
// 	{
// 		type: list,

// 	}
// ])
// 	