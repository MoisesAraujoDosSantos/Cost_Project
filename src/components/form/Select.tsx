import styles from './Select.module.css'

type selectOption = {
    id: number,
    name: string
}
type props = {
    text : string,
    name: string, 
    options:selectOption[], 
    handleOnChange?: React.ChangeEventHandler<HTMLInputElement>, 
    value?: string
}
// ChangeEventHandler<HTMLInputElement

function Select({text,name,options,handleOnChange,value}: props){
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name}>
                <option>Selecione a opção</option>
                {options.map((option)=>(
                  <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select