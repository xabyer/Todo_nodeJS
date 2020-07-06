const descripcion = {

    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'


}

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca como completado opendiente la tarea',
    type: 'boolean'
}

const argv = require('yargs')
    .command("crear", "Crea un elemento por hacer", { descripcion })
    .command("actualizar", "Actualiza el estado completo de una tarea", {
        descripcion,
        completado
    })
    .command("borrar", "borra una tarea", { descripcion })
    .command('listar', "lista todos las tareas hechas, con la opcion -c false muestra todas las tareas", { completado })
    .help()
    .argv;

module.exports = {
    argv
}