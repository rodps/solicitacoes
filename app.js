var express            = require('express'),
	app                = express(),
	models             = require('./models'),
	bodyParser         = require("body-parser");
	
var exampleRouter = require("./routes/example");

// configuracoes
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//rotas
app.use("/", exampleRouter);

//Cria o banco de dados
//{force:true} Drop tables se ja existirem
models.sequelize.sync({force:true}).then(() => {
	app.listen(3000, function() {
		console.log("The Server Has Started!");
	});
});

app.get("/", function(req, res) {
	res.render("index");
});