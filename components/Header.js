import React from 'react';
import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario{
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {
    //Importamos el router
    const router = useRouter();

    //Query de apollo usuario
    const {data, loading, error} = useQuery(OBTENER_USUARIO);

    if(loading) return null;
    
    if(!data.obtenerUsuario){
        router.push('/login');
        return <p></p>;
    }

    //extraemos el nombre y apellido
    const {nombre, apellido} = data.obtenerUsuario;

    //Cerrar sesión y eliminar información existente
    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className="flex justify-between">
            <p className="mr-2">Bienvenido <span className="bg-blue-100 border-2 border-gray-100 px-2">{nombre} {apellido}</span></p>
            
            <button
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
                onClick={() => cerrarSesion()}
                type="button"
            >
                Cerrar Sesión
            </button>
        </div>
    );
}
 
export default Header;