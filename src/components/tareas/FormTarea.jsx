import React from 'react'

import  tareaContext  from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext';

import { useContext , useState, useEffect} from 'react';

const FormTarea = () => {

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    //obtener context de tareas
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, agregarTarea, validarTarea, 
        errortarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //Effect que detect si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada);    
        } else {
            guardarTarea({
                nombre:''
            })
        }
    }, [tareaseleccionada])

    //state del formulario
    const [tarea, guardarTarea] = useState({
        nombre:'',

    })

    //state de la tarea
    const {nombre} = tarea;

    if (!proyecto) return null    

    const [proyectoActual] = proyecto;


    //Leer los valores del formulario
    const handleChange = e =>{
        guardarTarea ({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;        
        }

        // Si es edición o si es nueva tarea
        if(tareaseleccionada === null){
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea);
            
            //Elimina tareasellecionada del state
            limpiarTarea();
        }

        //obtener y filtar las tareas del proyecto actual
        console.log(proyectoActual._id)
        obtenerTareas(proyectoActual._id);

        //reiniciar el form
        guardarTarea({
            nombre:''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input type="text"
                            className="input-text"
                            placeholder="Nombre de la tarea"
                            value= {nombre}
                            name="nombre"
                            onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input" >
                    <input type="submit"
                            className="btn btn-primario btn-submit btn-block"
                            value={tareaseleccionada ? 'Editar Tarea': 'Agregar Tarea'}
                    />
                </div>

            </form>

            {errortarea ? <p className="mensaje error">
                El nombre de la tarea es obligatorio
            </p> : null}

        </div>
    )
}

export default FormTarea
