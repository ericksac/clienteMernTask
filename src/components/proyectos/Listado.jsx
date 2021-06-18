import React from 'react'
import Proyecto from './Proyecto'
import proyectoContext from '../../context/proyectos/proyectoContext'
import { useContext, useEffect } from 'react'
import AlertaContext  from '../../context/alertas/alertaContext'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const ListadoProyectos = () => {


    //Extraer proeyctos de state inicial

    const proyectosContext = useContext(proyectoContext);
    const { proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {mensaje, alerta, mostrarAlerta} = alertaContext;

    //obtenere proyectos ucando carge el componente
    useEffect(() => {
        //Si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos();

        //eslint-disable-next-line
    }, [mensaje]);

    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;


    return (
        <ul className="listado-proyectos">

            {alerta ? (
                <div className= {`alerta ${alerta.categoria}`}>
                    {alerta.msg}
                </div>
            ) : null}

            <TransitionGroup>
                {
                    proyectos.map(proyecto => (
                        <CSSTransition
                            key={proyecto._id}
                            timeout={200}
                            classNames="proyecto"
                        >
                            <Proyecto
                                proyecto={proyecto}
                            />
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos
