console.log("server started")
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config({path: "./.env"})
}
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const config = require("./config/config")
const { sequelize } = require("./models")
const app = express();
app.use(morgan("combined"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/public', express.static('public'));


app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your client's origin
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
  });



require('./passport')
require("./routes")(app)
sequelize.sync({ force: false })
	.then(() => {
		app.listen(config.port, () => console.log(`Express server running on port ${config.port}`));
	})
