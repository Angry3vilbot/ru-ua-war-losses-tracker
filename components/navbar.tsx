import Link from 'next/link'
import Image from 'next/image'
import menu from '../public/hamburger.svg'
import menuActive from '../public/hamburger-active.svg'
import styles from '../styles/Navbar.module.css'
import { useRef, useState } from 'react'

export default function Navbar() {
    const [source, setSource] = useState(menu)
    const navigation = useRef<HTMLUListElement>(null)

    function revealMenu (ev: React.MouseEvent) {
        navigation.current?.classList.toggle(`${styles.show_menu}`)
        let src
        if(source === menu) {
            setSource(menuActive)
            return
        }
        setSource(menu)
    }
    
    return (
        
        <nav className={styles.navigation}>
            <h2>War Losses Tracker</h2>
            <ul ref={navigation}>
                <li><Link href={'/'}>Main Page</Link></li>
                <li>
                    <Link href={'#'}>Comparisons</Link>
                    <ul className={styles.dropdown}>
                        <li className={styles.dropdown_item}><Link href={'/comparison/total'}>Comparison By Type</Link></li>
                        <li className={styles.dropdown_item}><Link href={'/comparison/destroyed'}>Comparison of Destroyed Equipment by Type</Link></li>
                        <li className={styles.dropdown_item}><Link href={'/comparison/captured'}>Comparison of Captured Equipment by Type</Link></li>
                        <li className={styles.dropdown_item}><Link href={'/comparison/damaged'}>Comparison of Damaged Equipment by Type</Link></li>
                        <li className={styles.dropdown_item}><Link href={'/comparison/abandoned'}>Comparison of Abandoned Equipment by Type</Link></li>
                    </ul>
                </li>
            </ul>
            <button onClick={revealMenu} className={styles.menu_btn}><Image src={source} alt='Menu'></Image></button>
        </nav>
    )
}