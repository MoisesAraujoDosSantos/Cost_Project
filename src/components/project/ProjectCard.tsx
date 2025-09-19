import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill, BsTrash } from 'react-icons/bs'

type Category = { id: string, name: string }
type props = {
    id: string, name: string, budget: number
    category?: Category,
    handleRemove?: (id: string) => void
}

function ProjectCard({ id, name, budget, category, handleRemove }: props) {
 
    const remove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault
        //encadeamento opcional
        handleRemove?.(id)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento</span> R${budget}
            </p>
            <p className={styles.category_text}>

                <span className={styles[category?.name?.toLowerCase() ?? "sem-categoria"]}></span> {category?.name ?? "sem categoria"}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>
                <button onClick={remove}>
                    <BsTrash />
                    Remover
                </button>
            </div>
        </div>
    )
}

export default ProjectCard
