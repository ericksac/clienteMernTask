import React, {useContext} from 'react'
import tareaContext from '../../context/tareas/tareaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'

const Tarea = ({tarea}) => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext;

    const tareasContext = useContext (tareaContext);
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //extraer el proyecto
    const [proyectoActual] = proyecto;

    //Función que se ejecuta cuando el uusario presiona el btn de eliminar tarea
    const tareaEliminar = id =>{
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    // Funcion para cambiar el estado de la tarea
    const cambiarEstado = tarea =>{
        if(tarea.estado){
            tarea.estado = false;
        } else{
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    //Agrega una tarea actual cuando el suuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>
                {tarea.nombre}
            </p>
            <div className="estado">
                {
                    tarea.estado
                    ?(
                        <button
                            type="button"
                            className="completo"
                            onClick={()=> cambiarEstado(tarea)}
                        >
                          Completo  
                        </button>
                    )
                    :(
                        <button
                            type="button"
                            className="incompleto"
                            onClick={()=> cambiarEstado(tarea)}
                        >
                         Incompleto  
                        </button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}   
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario" 
                    onClick={()=> tareaEliminar(tarea._id)}>
                    Eliminar
                </button>
            </div>
        </li>
    )
}

export default Tarea
