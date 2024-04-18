// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function (req, res) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    // Si no se proporciona una fecha, usar la fecha y hora actual
    date = new Date();
  } else {
    // Intentar parsear dateString como un número para verificar si es un timestamp Unix
    const timestamp = parseInt(dateString);
    if (!isNaN(timestamp) && dateString.trim() == timestamp.toString()) {
      // Si dateString es numéricamente válido y corresponde exactamente a su forma numérica
      // asumir que es un timestamp Unix en milisegundos
      date = new Date(timestamp);
    } else {
      // Si no es un número, intentar crear la fecha directamente con la cadena
      // new Date es bastante flexible y puede manejar la mayoría de los formatos de fecha estándares, incluido YYYY/MM/DD
      date = new Date(dateString);
    }
  }

  // Verificar si la fecha es válida
  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    // Si la fecha es válida, enviar la respuesta con las claves unix y utc
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
