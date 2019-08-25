// >npm i express mongoose

const express = require('express');
const mongoose = require('mongoose');

const app = express()

// for parsing application/json
app.use(express.json()) 

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })) 

// Mongoose provides a straight-forward, schema-based solution to model your application data. 
// It includes built-in type casting, validation, query building, business 
// logic hooks and more, out of the box.
mongoose.connect('mongodb://localhost:27017/shopping',{ useNewUrlParser: true });

const Product = mongoose.model('Product', { name: String, price: Number });

app.post('/api/products',function(req, res)  {
    const product = new Product( req.body );
    product.save(function(err,data){
        res.send(data);    
    });
});

app.get('/api/products', function(req, res) {
    Product.find(function(err, data){
        res.send(data);
   });
}); 

app.get('/api/products/:id', function(req, res){
    Product.findById(req.params.id, function (err, data) {
        res.send(data);
    });
});

app.put('/api/products/:id', function(req, res){
    Product.findByIdAndUpdate(req.params.id, req.body,function(){
    	res.send("put request");
    });
});

app.delete('/api/products/:id', function(req, res) {
    Product.findByIdAndRemove(req.params.id,function(err, data){
    	res.send("delete request");
    });
});


app.listen(3000, () => console.log('listening on port 3000!'))

