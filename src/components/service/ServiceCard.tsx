import { BsTrash } from 'react-icons/bs'
import styles from '../project/ProjectCard.module.css'
import type React from 'react'

export interface ServiceCard {
    id?: string,
    name?: string,
    cost?: string,
    description?: string,
    handleRemove?: (id?: string,cost?:string) => void
}
export const ServiceCard: React.FC<ServiceCard> =
    ({ id, name, cost, description, handleRemove }) => {

        const remove = (e:React.MouseEvent<HTMLButtonElement>)=>{
            e.preventDefault()
            handleRemove?.(id ?? '',cost?? '0')
        }
        return (
            <div className={styles.project_card}>
                <h4>{name}</h4>
                <p>
                    <span>Custo total:</span>R${cost}
                </p>
                <p>{description}</p>
                <div className={styles.project_card_actions}>
                    <button onClick={remove}>
                    <BsTrash/>
                    excluir
                    </button>
                </div>

            </div>
        )
    }