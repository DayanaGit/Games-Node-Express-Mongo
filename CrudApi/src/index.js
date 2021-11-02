const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const  {mongoose} = require('./database');
//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares - funciones ejecutadas antes de que lleguen a las rutas
//ver peticiones realizadas por el navegador
app.use(morgan('dev'));
//comprobar si el dato es json
app.use(express.json());

//routes
app.use('/api/home',require('./routes/routes'));
//Static files
app.use(express.static(path.join(__dirname,'public')));
//Starting the server

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});