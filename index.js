const axios = require('axios');

// YOUTUBE EXAMPLE

// (async (songName) => {
//     try {
//         const request = await axios.get(`https://www.youtube.com/results?q=${encodeURIComponent(songName)}&hl=en`);
//         const lisIds = request.data.match(/\/watch\?v=(.{11})/g);
//         console.log(lisIds);
//         console.log(`resultado encontrado: https://www.youtube.com${lisIds[0]}`);
//     } catch (e) {
//         console.log(e);
//     }
// })("party - feid - alejo");
// ----------------------------------------------------------------------------------------------------------------------
// OTHER EXMAPLE

// (async () => {
//     try {
//         const request = await axios.get("https://jsonplaceholder.typicode.com/users");
//         list = request.data;
//         console.log(list);
//         list.forEach(element => {
//             console.log(element.name);
//         });
//     } catch (e) {
//         console.log(e);
//     }
// })(); 
// ----------------------------------------------------------------------------------------------------------------------
// OTHER WITH EXPRESS

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/form', (req, res) => {
    // tomar el nomre de la cancion que se envia por el formulario
    let songName = req.query.name;

    console.log(songName);

    if (!songName) {
        console.log('I did not enter a name');
        return res.redirect('/error.html');
    }

    (async (song) => {
    try {
        // hacer la peticion con axios y encodeURIComponent(song) para evitar problemas con espacios
        const request = await axios.get(`https://www.youtube.com/results?q=${encodeURIComponent(song)}&hl=en`); 
        
        // crear una lista de los ids de los videos
        const lisIds = request.data.match(/\/watch\?v=(.{11})/g);

        // mostrar la lista de ids
        console.log(lisIds);

        // mostrar el primer id en la consola y enviarlo como respuesta a la pagina
        console.log(`Result found: https://www.youtube.com${lisIds[0]}`);
        res.send(`Result found: <a href="https://www.youtube.com${lisIds[0]}" target="__blank">https://www.youtube.com${lisIds[0]}</a>`);
    } catch (e) {
        // mostrar los errores en la consola y en la pagina
        console.log(e);
        res.send(e);
    }
    })(songName); // llamar a la funcion y pasarle el nomnbre de la cancion
});

// escuchar en el puerto 3000
app.listen(3000, () => {
    console.log('server in: http://localhost:3000');
});

