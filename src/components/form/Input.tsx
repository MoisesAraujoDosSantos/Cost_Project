import styles from './Input.module.css'

export interface InputProps  {type: string,text : string, name: string, placeholder?: string, handleOnChange?: React.ChangeEventHandler<HTMLInputElement>, value?: string}
// ChangeEventHandler<HTMLInputElement

export const Input :React.FC<InputProps> =  ({type,text,name,placeholder,handleOnChange,value})=>{
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            />
             
        </div>
    )
}
