import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'


type props = { handleSubmit?:string, btnText?: string, projectData: string }
function ProjectForm({ handleSubmit,btnText,projectData }: props) {
    const [categories, setCategories] = useState([])
    const [project,setProject] = useState(projectData|| [])


    useEffect(() =>{
    fetch("http://localhost:5000/categories",
        { method: "GET", headers: { 'Content-Type': 'application/json' } })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    },[])
    

    return (
        <form className={styles.form}>
            <Input
                type='text'
                text='Nome do projeto'
                name='name'
                placeholder='Insira o nome do projeto'
            />
            <Input
                type='number'
                text='Orçamento do projeto'
                name='budget'
                placeholder='Insira o orçamento total'
            />
            <Select name='category_id' text='Selecione a categoria' options={categories} />
            <SubmitButton text={btnText} />
        </form>
    )
}


export default ProjectForm