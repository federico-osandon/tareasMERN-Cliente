import React, { useReducer } from 'react'
import TareaContext from './tareaContext'
import tareaReducer from './tareaReducer'
//import uuid from 'uuid/dist/v4';
import clienteAxios from '../../config/axios'

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types'

const TareaState = props  => {
    
    const initialState = {        
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    // Crear disparch y state
    const [ state, dispatch ] = useReducer(tareaReducer, initialState)

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {

        console.log(proyecto);

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            console.log('resultado obtener tareas');
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    //  Agregar una tarea al proyeto seleccionado
    const agregarTarea = async tarea => {
        //tarea.id = uuid()
        const resultado = await clienteAxios.post('/api/tareas', tarea)
        console.log(resultado)
        try {
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    // Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Edita o modifica una tarea
    const actualizarTarea = async tarea => {

        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
                
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Cambia el estado de cada tarea
    // const cambiarEstadoTarea = tarea => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    // Extrae una tarea para edición
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea 
        })
    }

   

    // Elimina la tarea seleccionada
    const limpiarTarea = () => {
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
                //cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState
