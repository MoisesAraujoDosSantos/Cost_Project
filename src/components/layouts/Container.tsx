import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'
import styles from './Container.module.css'

type ContainerProps = {children?:ReactNode,customClass?:keyof typeof styles }

function Container({children,customClass}: ContainerProps) {

    return (
    <>
        <main className={`${styles.container} ${customClass && styles[customClass]}`}>
            {children}
            <Outlet />
        </main>
    </>)
}


export default Container