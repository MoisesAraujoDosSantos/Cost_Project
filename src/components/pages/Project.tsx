import { parse, v4 as uuidv4 } from 'uuid'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Loading from '../layouts/Loading'
import Container from '../layouts/Container'
import ProjectForm from '../project/ProjectForm'
import type { ProjectType,Service } from '../types/ProjectType'
import Message from '../layouts/Message'
import { ServiceForm } from '../service/ServiceForm'
import { ServiceCard } from '../service/ServiceCard'

function Project() {
    const { id } = useParams()
    let sequenceKey = useRef(1)

    const [project, setProject] = useState<ProjectType | null>(null)
    const [services, setServices] = useState<Service[] | null>(null)
    const [showProjectForm, setShowProjectForm] = useState<boolean>(false)
    const [showServiceForm, setShowServiceForm] = useState<boolean>(false)
    const [message, setMessage] = useState<string>()
    const [typeMessage, setTypeMessage] = useState<string>("success")
    
    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
        }, 5000)
    }, [id])

    function createService(project: ProjectType) {
        { sequenceKey.current += 1 }
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost ?? "0")

        if (newCost > parseFloat(project.budget)) {

            setMessage('Orçamento ultrapassou o limite maximo, verifique o valor do serviço')
            setTypeMessage('error')
            //forçando a renderização
            setProject({
                ...project,
                services: project.services.slice(0, -1)
            })
            return false
        }

        project.cost = newCost.toString()

    



        fetch(`http://localhost:5000/projects/${project.id}`,
            {
                method: 'PATCH',
                headers: {
                    'Context-Type': 'application/json'
                },
                body: JSON.stringify(project)
            }
        )
            .then((resp) => resp.json())
            .then((data) => {
                setShowServiceForm(false)
                
                
                setMessage("Serviço criado com sucesso")

            })
            .catch((err) => console.log(err))
    }

    function removeService(id?:string, cost?:string){
        if(!project || !cost)
            return;

        const serviceUpdate = project.services.filter(
            service => service.id !== id

        )
        const projectUpdated = {...project,
            services: serviceUpdate,
            cost:  (parseFloat(project.cost) - parseFloat(cost)).toString()
        }
    
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp)=> resp.json())
        .then((data)=> {
            setProject(projectUpdated)
            setServices(serviceUpdate)
                
            setMessage("Serviço removido com sucesso")
        })
        .catch((err)=> console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }
    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }


    function editPost(project: ProjectType) {

        { sequenceKey.current += 1 }
        //validation
        if (Number(project.budget) < Number(project.cost)) {
            setMessage("O orçamento não pode ser menor que o custo do projeto")
            setTypeMessage('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage("Projeto atualizado")
                setTypeMessage('success')

            })
            .catch((e) => console.log(e))
    }

    return (
        <>
            {project ?
                (<div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message key={sequenceKey.current} type={typeMessage} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? "Editar Projeto" : "Fechar"}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span>{
                                            project.category?.name ? project.category?.name :
                                                "não tem categoria"
                                        }
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span>R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total de Utilizado:</span>R$ {project.cost}
                                    </p>

                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost}
                                        btnText='Concluir edição'
                                        projectData={project} />
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_container}>
                            <h2> Adicione um Serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm &&
                                    (<ServiceForm
                                        handleSubmit={createService}
                                        btntext='Adicionar Serviço'
                                        projectData={project} />)}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">

                            {services != undefined && services.length > 0 &&
                            services.map((service)=>(
                                <ServiceCard
                            
                                    id ={service.id}
                                    name = {service.name}
                                    cost = {service.cost}
                                    description = {service.description}
                                    key = {service.id}
                                    handleRemove = {removeService}
                                />
                            ))
                            } 
                            {services?.length === 0 && <p>Tá sem serviço</p>}

                        </Container>
                    </Container>
                </div>)
                : (
                    <Loading />
                )
            }
        </>
    )
}

export default Project
