const express = require('express');
const router = require('.');
const app = express.Router();

const instituteImages = [
  '/workspaces/pila2/public/stylesheets/img/ima1.jpg',
  '/workspaces/pila2/public/stylesheets/img/ima2.jpg',
  '/workspaces/pila2/public/stylesheets/img/ima3.jpg',
  '/workspaces/pila2/public/stylesheets/img/ima4.jpg',
  '/workspaces/pila2/public/stylesheets/img/ima5.jpg'
];

function getRandomInstituteImage() {
  const randomIndex = Math.floor(Math.random() * instituteImages.length);
  return instituteImages[randomIndex];
}

router.get('/about/tec', (req, res) => {

  const randomImage = getRandomInstituteImage();

  const htmlPage = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Tec de Gustavo A Madero</title>
      </head>
      <body>
        <h1>Tecnologico de la Gustavo A Madero</h1>
        <p>Descripción: El Instituto fue creado para formar profesionistas capaces de enlazar exitosamente a México con el mundo, a fin de propiciar el desarrollo tecnológico en distintas áreas en beneficio del ser humano.</p>
        <p>Misión: Formar con responsabilidad y excelencia a profesionales capaces de enfrentar y resolver los retos que se presentan en el ámbito nacional e internacional.</p>
        <p>Valores: *Respeto, Liderazgo, Perseverancia, Responsabilidad</p>
        <img src="${randomImage}" alt="Imagen del Tec de Gustavo A Madero">
      </body>
    </html>
  `;

  res.send(htmlPage);
});

router.get('/about/api/tec', (req, res) => {
  
  const randomImage = getRandomInstituteImage();

  const response = {
    name: "Tec de Gustavo A Madero",
    description: "algo",
    mission: "...",
    values: "",
    image: randomImage
  };

  res.json(response);
});

module.exports = router;


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
