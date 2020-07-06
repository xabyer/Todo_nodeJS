const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {

        if (err) {
            throw new Error('No se pudo grabar', err);
        }

    });


}

const cargarDB = () => {

    try {

        listadoPorHacer = require('./../db/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

/* const getListado = () => {

    cargarDB();
    return listadoPorHacer;

} */

const getListado = (completado) => {

    cargarDB();

    if (completado) {

        let nuevoListadoPorHacer = listadoPorHacer.filter(tarea => tarea.completado === true);
        return nuevoListadoPorHacer;

    } else {

        return listadoPorHacer;

    }

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {

        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;

    } else {

        return false;

    }

}

const borrar = (descripcion) => {

    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {

        return false;

    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    /*  //mi código , funciona bien
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {

        listadoPorHacer.splice(index, 1);
        guardarDB();
        console.log('Tarea borrada');
        return true;

    } else {

        console.log('Tarea no encontrada');
        return false;

    } */

}


module.exports = {

    crear,
    getListado,
    actualizar,
    borrar

}