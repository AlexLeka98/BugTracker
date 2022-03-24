import { forwardRef } from "react";
import styles from './Input.module.css'

const Input = forwardRef((props, ref) => {
    const { onChange, type, label, placeholder, autoComplete } = props;
    return (
        <div className={styles.inputContainer}>
            <label>{label}</label>
            <input
                type={type}
                autoComplete={autoComplete}
                placeholder={placeholder}
                onChange={onChange ? onChange : undefined}
                ref={ref}
            />
        </div>
    )
});


export default Input;