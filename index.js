const express = require('express');
const logger = require('morgan');
const moviesRoutes = require('./routes/movies.routes');
const reviewsRoutes = require('./routes/reviews.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = 3000;

// Middlewares globales
app.use(express.json());
app.use(logger('dev'));

// Rutas principales
app.get('/', (req, res) => {
    console.log('¡Bienvenidos!');
    res.send('¡Bienvenidos a la API de Películas!');
  });
  

  
app.use('/movies', moviesRoutes);
app.use('/movies', reviewsRoutes); // Requiere el ID de la película


// Middlewares de errores
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
