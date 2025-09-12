import styles from './Input.module.css'

type props = {type: string,text : string, name: string, placeholder?: string, handleOnChange?: React.ChangeEventHandler<HTMLInputElement>, value?: string}
// ChangeEventHandler<HTMLInputElement

function Input({type,text,name,placeholder,handleOnChange,value}: props){
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

export default Input