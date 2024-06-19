import { useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '@/contexts/AuthContext'

import { FiLogOut } from 'react-icons/fi'

import styles from './styles.module.scss'

export function Header(){

    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.png" width={190} height={60}/>
                </Link>

                <nav className={styles.menuNav}>
                    <Link href="/category">
                        Categoria
                    </Link>

                    <Link href="/product">
                        Cardápio
                    </Link>

                   <button onClick={signOut}>
                        <FiLogOut size={24} color='#FFF'/>
                   </button>
                </nav>
            </div>
        </header>
    )
}