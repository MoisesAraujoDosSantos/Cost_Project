import { Link } from 'react-router-dom'
import styles from './LinkButton.module.css'

type props = {to:string, text: string}

function LinkButton ({to,text}: props){
    return (
       <Link className={styles.btn} to={to}>{text}</Link>
    )
}


export default LinkButton