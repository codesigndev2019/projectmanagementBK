// realizamos el import de express para crear  nuestro servidor
const express = require("express");

const connectDB = require("./config/db");
const cors = require('cors'); 
// creacion servidor
const app = express();

// conectamos con la base de datos
connectDB();

// habilitar cors
app.use(cors());
// habilitar expres.json

app.use(express.json({ extend: true }));

// declaracion de puerto de la app
const port = process.env.PORT || 4000;

// importamos nuestras rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));



// arrancamos la app
app.listen(port,'0.0.0.0', () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
