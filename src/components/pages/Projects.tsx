import { useLocation } from "react-router-dom"
import Message from "../layouts/Message"
import styles from './Projects.module.css'
import Container from "../layouts/Container"
import LinkButton from "./LinkButton"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"
import Loading from "../layouts/Loading"

type Project = {
  id: string
  name: string
  budget: number
  category?: { id: string; name: string }
}



function Projects() {

    const [projects, setProjects] = useState<Project[]>([])
    const [removeLoading, setRemoveLoading] = useState<boolean>(false)
    const [projectMeessage,setProjectMeessage] = useState <string>("")


    const location = useLocation()
    const message = location.state?.message

    useEffect(
        ()=>{
            fetch('http://localhost:5000/projects',{
                method:'GET',
                headers: {
                    'Context-Type': 'application/json'
                }
            })
            .then((resp)=> resp.json())
            .then((data)=> {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err)=> console.log(err))
        },[]
    )

    function removeProject(id:string){
        fetch(`http://localhost:5000/projects/${id}`,
            {method: 'DELETE',
             headers: {
                'Context-Type': 'application/json'
             }
            }
        )
        .then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id!== id))
            setProjectMeessage("Projeto Removido com sucesso")
        })
        .catch(err => console.log(err))
    }

    return (

        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>

                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            <Message type="SUCCESS" msg={message} />
            {projectMeessage && <Message type="SUCCESS" msg={projectMeessage} />}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) =>
                    <ProjectCard
                    id={project.id}
                    name={project.name}
                    budget={project.budget}
                    category={project.category}
                    key={project.id}
                    handleRemove={removeProject}
                    />)
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 &&
                (<p>Não há projetos cadastrados!</p>)
                }

            </Container>
        </div>

    )
}

export default Projects