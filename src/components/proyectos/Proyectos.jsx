import React, {useContext} from 'react'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import AuthContext from '../../context/autentificacion/authContext'
import { useEffect } from 'react'

const Proyectos = () => {
  
  //Extraer la información de la autentificación
  const authContext = useContext(AuthContext);
  const { usuarioAutenticado } = authContext;
  
  useEffect(() => {
    usuarioAutenticado();
    
        // eslint-disable-next-line
  }, [])

    return (
      <div className="contenedor-app" >
          <Sidebar/>

          <div className="seccion-principal">
            <Barra/>

            <main>
              <FormTarea/>
                <div className="contenedor-tareas">
                  <ListadoTareas/>
                </div>
            </main>
          </div>
      </div>
    )
}

export default Proyectos
