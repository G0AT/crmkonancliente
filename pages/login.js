import React, {useState} from 'react';
import Layout from '../components/Layout';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {gql, useMutation} from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario ($input : AutenticarInput){
        autenticarUsuario(input: $input){
            token
        }
    }
`;

const Login = () => {
    //State para el mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);

    //Mutation para loguear usuarios
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    //Routing
    const router = useRouter();

    const formik = useFormik({
        initialValues : {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Email no válido").required('Espacio obligatorio'),
            password: Yup.string().required('Espacio obligatorio').min(8, 'Longitud inválida: (8 caracteres mínimo)'),
        }),
        onSubmit: async valores => {
            //Destructuring para los valores
            const {email, password} = valores;

            //Crear el nuevo usuario con el mutation
            try {
                const {data} = await autenticarUsuario({
                    variables : {
                        input: {
                            email,
                            password
                        }
                    }
                });

                //Mostrar que el usuario se creó correctamente
                guardarMensaje('Ingresando...');

                setTimeout(() => {
                    //Guardando el token
                    const {token} = data.autenticarUsuario;
                    localStorage.setItem('token', token);
                }, 2000);


                //Elimina la alerta después de 3 segundos
                setTimeout(() => {
                    //Regresamos el mensaje a null
                    guardarMensaje(null);

                    //Redirigir al usuario a iniciar sesión
                    router.push('/');

                }, 3000);

            } catch (error) {
                //Mostrar el error del GraphQL
                guardarMensaje(error.message.replace('GraphQL error:', ''));
                
                //Elimina la alerta después de 3 segundos
                setTimeout(() => {
                    guardarMensaje(null);
                }, 3000);
            }
        }
    });

    const mostrarMensaje = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{mensaje}</p>
            </div>
        )
    }

  return ( 
    <div>
      <Layout>
          {mensaje && mostrarMensaje()}
        <h1 className="text-2xl text-center text-white font-light">Login</h1>

        <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
                <form 
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2" 
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input 
                            className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            id="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}    
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                        </div>
                    ) : null}

                    <div>
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2" 
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input 
                            className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                            placeholder="********"
                            id="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}     
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.password}</p>
                        </div>
                    ) : null}

                    <input 
                        type="submit"
                        className="bg-gray-800 rounded-sm border border-blue-200 w-full mt-5 p.2 text-white uppercase"
                        value="Iniciar Sesión"/>
                </form>
            </div>
        </div>
      </Layout>
    </div>
   );
}
 
export default Login;