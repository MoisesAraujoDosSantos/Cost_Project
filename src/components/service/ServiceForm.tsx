import {Input} from '../form/Input'
import SubmitButton from '../form/SubmitButton'
import type { ProjectType, Service } from '../types/ProjectType'
import styles from './ServiceForm.module.css'
import { useState } from 'react'

export interface ServiceFormProps {
  btntext: string,
  projectData: ProjectType,
  handleSubmit: (proj: ProjectType) => void,
}

export const ServiceForm: React.FC<ServiceFormProps> = ({ handleSubmit, btntext, projectData }) => {
  const [service, setService] = useState<Service>({})

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    //depois saber o que tipo no service
    projectData.services?.push(service)
    handleSubmit(projectData)
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setService({ ...service, [e.target.name]: e.target.value })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type='text'
        text='Nome do Serviço'
        name='name'
        placeholder='Insira o nome do serviço'
        handleOnChange={handleChange}
      />
      <Input
        type='Number'
        text='Custo do Serviço'
        name='cost'
        placeholder='Insira o valor total'
        handleOnChange={handleChange}
      />  <Input
        type='text'
        text='Descrição do Serviço'
        name='description'
        placeholder='Descreva o serviço'
        handleOnChange={handleChange}
      />
      <SubmitButton text={btntext} />
    </form>
  )
}
