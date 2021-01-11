import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {useRouter} from 'next/router';

const Layout = ({children}) => {

    //Importamos el router
    const router = useRouter();

    return ( 
        <>
            <Head>
                <title>Konan-crm</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossorigin="anonymous"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=East+Sea+Dokdo&family=Pacifico&family=Roboto+Slab:wght@200&family=Roboto:ital,wght@0,100;0,300;0,400;1,100&display=swap" rel="stylesheet"/>
                <link href="/statics/css/app.css" rel="stylesheet"/>
                <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>
            {router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
                <div className="bg-gray-800 min-h-screen flex flex-col justify-center">
                    {children}
                </div>
            ): (
                <div className="bg-gray-200 min-h-screen">
                    <div className="flex min-h-screen">
                        <Sidebar/>
                        <main className="sm:w-2/3 xl:w-4/5 min-h-screen p-5">
                                <Header/>
                            {children}
                        </main>
                    </div>
                </div>
            )}
        </>
     );
}
 
export default Layout;