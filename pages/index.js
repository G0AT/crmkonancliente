import React from 'react'
import Layout from '../components/Layout';
import {gql, useQuery} from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_ALMACEN = gql`
  query obtenerAlmacen {
    obtenerAlmacen{
      nombreMaterial
      principal
      subAlmacen
      codigoAlmacen
    }
  }
`;
 const Index = () => {
  //uso del Router
  const router = useRouter();
  //consulta de GraphQL
  const { data, loading, error } = useQuery(OBTENER_ALMACEN);

  if (loading) return 'Cargando...';
  
  if(!data?.obtenerAlmacen){
    router.push('/login');
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Almacén</h1>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/4 py-2">Nombre Material</th>
              <th className="w-1/4 py-2">Almacén principal</th>
              <th className="w-1/4 py-2">Sub-Almacén</th>
              <th className="w-1/4 py-2">Código Material</th>
            </tr>
          </thead>
          <tbody className="bg-white">
          {data?.obtenerAlmacen.map(almacen => (
              <tr key={almacen._id}>
                <td className="border px-4 py-2 text-center">{almacen.nombreMaterial}</td>
                <td className="border px-4 py-2 text-center">{almacen.principal}</td>
                <td className="border px-4 py-2 text-center">{almacen.subAlmacen}</td>
                <td className="border px-4 py-2 text-center">{almacen.codigoAlmacen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Layout>
    </div>
  )
}
 
export default Index; 