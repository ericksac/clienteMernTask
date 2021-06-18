import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autentificacion/authContext'

const NuevaCuenta = ( props ) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //Context de autorización
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;

    //En caso de que el usuario se haya autentificado o registrao o sea un registro duplicado
    useEffect (()=> {
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history ]);

    //State para iniciar sesión
    const[usuario, guardarUsuario]  = useState({
        nombre:'',
        email: '',
        password:'',
        confirmar:''
    });

    const {nombre, email, password, confirmar} = usuario;

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
        console.log(nombre);
    }

    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e =>{
        e.preventDefault();

        //validar sin campos vacios

        if(nombre.trim() ==='' ||
            email.trim() ==='' ||
            password.trim() ==='' ||
            confirmar.trim() ==='' ){
                mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
                return;
            }

        //Password mínimo de 6 caracteres
        if(password.legth < 6 ){
            mostrarAlerta('El password dber ser de al menos 6 caracteres', 'alerta-error')
            return;
        }    

        //Revisar que dos passwords sean iguales
        if(password !== confirmar){
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
           { alerta ? ( <div className={ `alerta ${alerta.categoria}` }>{alerta.msg}</div> )  : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear una cuenta</h1>
                <form onSubmit={onSubmit}
                
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text"
                                id="nombre"
                                name= "nombre"
                                placeholder="Tu nombre"
                                value={nombre}
                                onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                                id="email"
                                name= "email"
                                placeholder="Tu email"
                                value={email}
                                onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"
                                id="password"
                                name= "password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={onChange} />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input type="password"
                                id="confirmar"
                                name= "confirmar"
                                placeholder="Repite tu password"
                                value={confirmar}
                                onChange={onChange} />
                    </div>

                    <div className="campo-form">
                        <input type="submit"
                                className="btn btn-primario btn-block"
                                value="Registrar"
                        />
                    </div>

                </form>
                <Link to={'/'} className= "enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}

export default NuevaCuenta
