import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autentificacion/authContext'

const Login = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    //Context de autorización
    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;
    

    //En caso de que el password o usuario no exista
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
        email: '',
        password:''
    });

    const {email, password} = usuario;

    const onChange = e =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : [e.target.value]
        });
    }

    //Cuando el usuario quiere iniciar sesión
    const onSubmit = e =>{
        e.preventDefault();

        //validar sin campos vacios
        if(email[0].trim()==='' || password[0].trim()===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }
        //asarlo al action
        const data = {
            email: email[0],
            password: password[0]
        }
        iniciarSesion(data);
    }

    return (
        <div className="form-usuario">
            { alerta ? ( <div className={ `alerta ${alerta.categoria}` }>{alerta.msg}</div> )  : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}
                
                >
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
                        <input type="submit"
                                className="btn btn-primario btn-block"
                                value="Iniciar Sesión"
                        />
                    </div>

                </form>
                <Link to={'/nueva-cuenta'} className= "enlace-cuenta">
                    Obtener cuenta
                </Link>
            </div>
        </div>
    )
}

export default Login
