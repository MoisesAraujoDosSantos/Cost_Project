import { useEffect, useState } from 'react'

import styles from './Message.module.css'

type props = {type: string,msg: string}

function Message ({type, msg}:props){
    const [visible,setVisible] = useState(false)
    useEffect(()=>{
        if(!msg){
            setVisible(false)
            return
        }
        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000);
        return () => clearTimeout(timer)
    },[msg])

    return(
        <>
        {visible && (
            <h3 className={
                `${styles.message} 
                 ${styles[type.toLocaleLowerCase()]}`}>
                    {msg}
            </h3>
                    )
        }
        </>
    ) 

}

export default Message