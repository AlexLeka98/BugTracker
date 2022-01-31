import { forwardRef, Fragment } from "react";
import styles from './Input.module.css'
import { Route, Link } from "react-router-dom";
import { Switch } from "react-router-dom";

const Input = forwardRef((props, ref) => {
    const { onChange, type, label, placeholder } = props;
    return (
        <div className={styles.inputContainer}>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange ? onChange : undefined}
                ref={ref}
            />
        </div>
    )
});


export default Input;