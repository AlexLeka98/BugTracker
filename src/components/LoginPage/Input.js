import { Fragment, forwardRef } from "react";
import styles from './Input.module.css'

const Input = forwardRef((props,ref) => {
    const { onChange, type, label } = props;
    return (
        <div className={styles.inputContainer}>
            <label>{label}</label>
            <input
                type={type}
                placeholder={`Enter your ${type} here...`}
                onChange={onChange ? onChange : undefined}
                ref={ref}
            />
        </div>
    )
});


export default Input;