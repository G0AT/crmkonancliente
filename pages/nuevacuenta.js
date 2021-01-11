import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Layout from '../components/Layout';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario ($input: UsuarioInput){
        nuevoUsuario (input: $input){
            id
            nombre
            apellido
            email
        }
    }
`;


const NuevaCuenta = () => {
    //State para el mensaje de alerta
    const [mensaje, guardarMensaje] = useState(null);
    
    //Mutation para nuevos usuarios
    const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

    //Routing
    const router = useRouter();

    //Llamamos al formik para las validaciones
    const formik = useFormik({
        initialValues : {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('Espacio obligatorio'),
            apellido: Yup.string().required('Espacio obligatorio'),
            email: Yup.string().email("Email no válido").required('Espacio obligatorio'),
            password: Yup.string().required('Espacio obligatorio').min(8, 'Longitud inválida (8 caracteres mínimo)'),

        }),
        onSubmit: async valores => {

            //Destructuring para los valores
            const {nombre, apellido, email, password} = valores;

            //Crear el nuevo usuario con el mutation
            try {
                const {data} = await nuevoUsuario({
                    variables : {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                });

                //Mostrar que el usuario se creó correctamente
                guardarMensaje(`Usuario creado correctamente: ${data.nuevoUsuario.nombre}`);

                //Elimina la alerta después de 3 segundos
                setTimeout(() => {
                    //Regresamos el mensaje a null
                    guardarMensaje(null);

                    //Redirigir al usuario a iniciar sesión
                    router.push('/login')
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
        <h1 className="text-2xl text-center text-white font-light">Registro</h1>

        <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
                <form 
                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2" 
                            htmlFor="nombre"
                        >
                            Nombre
                        </label>
                        <input 
                            className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                            placeholder="Nombre"
                            id="nombre"
                            type="text"
                            value={formik.values.nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                    ) : null}

                    <div>
                        <label 
                            className="block text-gray-700 text-sm font-bold mb-2" 
                            htmlFor="apellido"
                        >
                            Apellidos
                        </label>
                        <input 
                            className="shadow appearance-none border border-blue-200 rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"
                            placeholder="Apellidos"
                            id="apellido"
                            type="text"
                            value={formik.values.apellido}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.touched.apellido && formik.errors.apellido ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.apellido}</p>
                        </div>
                    ) : null}

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
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
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
                        value="Registrar"/>
                </form>
            </div>
        </div>
      </Layout>
    </div>
   );
}
 
export default NuevaCuenta;