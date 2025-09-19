import { useEffect, useState } from 'react'
import {Input} from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'
import type { ProjectType, Category } from '../types/ProjectType'
type props = { handleSubmit: (project: ProjectType) => void, btnText?: string, projectData?:ProjectType }
function ProjectForm({ handleSubmit, btnText, projectData }: props) {
    const [categories, setCategories] = useState<Category[]>([])
    const [project, setProject] = useState<ProjectType>(projectData || {} as ProjectType)


    useEffect(() => {
        fetch("http://localhost:5000/categories",
            { method: "GET", headers: { 'Content-Type': 'application/json' } })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))
    }, [])

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmit(project)
    }
    //funciona com qualquer input
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setProject({
            ...project, [e.target.name]: e.target.value

        })
    }

    function handleCategory(e: React.ChangeEvent<HTMLSelectElement>) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                type='text'
                text='Nome do projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type='number'
                text='Orçamento do projeto'
                name='budget'
                placeholder='Insira o orçamento total'
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name='category_id'
                text='Selecione a categoria'
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id: ''}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}


export default ProjectForm