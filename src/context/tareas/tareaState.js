import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer'

import { TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA, 
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types/index';

import clienteAxios from '../../config/axios'

const TareaState = props =>{
    const initialState= {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    const [state, dispatch] = useReducer(TareaReducer, initialState);
    
    //Crear funciones

    //Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto =>{
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: { proyecto }});
           // console.log(resultado);
            dispatch ({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea =>{
        try {
            console.log(tarea)
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch ({
                type: AGREGAR_TAREA,
                payload: tarea 
            })
        } catch (error) {
            console.log(error);
        }

    }

    // Valida y muestra un error en caso de que sea necesario
    const validarTarea =()=>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea por id
    const eliminarTarea = async (id, proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}} );    
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);   
        }
    }

    //Actualiza o edita una tarea
    const actualizarTarea = async tarea =>{
    try {
        const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
        console.log(resultado);
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tareaExiste
        })
    } catch (error) {
        console.log(error)
    }
    }


    //EXTRAE UNA TAREA PARASU EDICION
    const guardarTareaActual = tarea =>{
        dispatch({
            type: TAREA_ACTUAL, 
            payload: tarea
        })
    }


    //Elimina la tareaseleccionada
    const limpiarTarea = () =>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea, 
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState;