var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Connect to the database
mongoose.connect('mongodb+srv://Tomasz:Poczwarka1993@cluster0-snzn6.mongodb.net/test?retryWrites=true&w=majority');

//Create a schema
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item:'get milk'}, {item:'walk dog'}, {item:'sleep'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){
app.get('/todo', function(req, res){
	Todo.find({}, function(err, data){
		if (err) throw err;
		res.render('todo', {todos: data});
	})
});

app.post('/todo', urlencodedParser, function(req, res){
	var newTodo = Todo(req.body).save(function(err, data){
		if (err) throw err;
		res.json(data);
	})
});

app.delete('/todo/:item', function(req, res){
	Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
		if (err) throw err;
		res.json(data);
	})
});
};