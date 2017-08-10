var mysql = require("mysql");
var inquirer = require("inquirer");
var products =[];
var fullItems=[];

// creating the connection to mysql
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '11',
    database: 'bamazonDB'
});
// running the connection & adding a function 
connection.connect(function(err) {
    if (err) throw err;
    showProducts();
});
// running the function to show the products from mysql databse
function showProducts() {
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        for (var i=0; i<res.length; i++){
            products.push(res[i].id + "\n" + res[i].product_name + " $" + res[i].price);
            fullItems.push(res[i]);
        }
        //Creating a new function
        items();
    });
}
//Running the fuction through a series of questions
function items(){
    inquirer.prompt([
        {
        name: 'buying',
        type: 'list',
        message: 'What is the ID of the product that you would like to purchase?',
        choices: products
    },
    {
        name: 'quantity',
        type: 'input',
        message: 'How many would you like to purchase?'
    }
    //After a series of questions, running a then function to show the results of the buyer
    ]).then(function(answer){
        var itemBuying = fullItems[answer.buying[0]-1];
        console.log("\n What a great choice! That will be very useful :) \n");
        console.log(itemBuying);
        var itemQuantity = answer.quantity;
        if(itemQuantity > itemBuying.stock_quantity){
            console.log("Whoopsie Daisy! We are currently out of that item!")
        } else{
            var endQuantity = itemBuying.stock_quantity - itemQuantity;
            var totalPurchase = itemQuantity * itemBuying.price;
         
        // connection.query("UPDATE products set stock_quantity=" + endQuantity + "WHERE id= " + itemBuying.id, function(err, res){
        //     if (err) throw err;
        //     console.log("The total today is "+ "$" + totalPurchase);
        //     });
        }
    });
}
