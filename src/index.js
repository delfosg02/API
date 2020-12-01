import '@babel/polyfill';  //importando de la biblioteca babel una funcion para adaptar nuestro codigo a multiplataforma


import app from "./server"

async function main() {
    await app.listen(app.set('port'));
    console.log('Server on port', app.set('port'));
}
main();