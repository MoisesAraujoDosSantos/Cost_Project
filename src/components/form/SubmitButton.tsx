import styles from './SubmitButton.module.css'

type props = {text ?: string}
// ChangeEventHandler<HTMLInputElement

function SubmitButton({text}: props){
    return (
        <div >
            <button className={styles.btn}>{text ? text : "coloque o tipo do submit"}</button>
        </div>
    )
}

export default SubmitButton