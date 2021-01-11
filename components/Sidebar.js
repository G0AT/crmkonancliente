import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const Sidebar = () => {

    //Detectar el routing actual y posicionarlo
    const router = useRouter();

    return ( 
        <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 min-h-screen p-5">
            <div>
                <p className="text-white text-2xl">CRM Konan</p>
            </div>
            <nav className="list-none mt-5 block">
                <li className={router.pathname === '/' ? "bg-blue-800 p-2 border-2 border-blue-300" : "p-2"}>
                    <Link href="/">
                        <a className="text-white block">Almacén</a>
                    </Link>
                </li>
                <li className={router.pathname === '/usuarios' ? "bg-blue-800 p-2 border-2 border-blue-300" : "p-2"}>
                    <Link href="/usuarios">
                        <a className="text-white block">Usuarios</a>
                    </Link>
                </li>
            </nav>
        </aside>
     );
}
 
export default Sidebar;