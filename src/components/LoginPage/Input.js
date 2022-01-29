import { TextField } from "@mui/material";
import { Fragment } from "react";

const Input = (props) => {
    const { onChange, type, inputRef, label } = props;
    return (
        <Fragment>
            <TextField
                type={type}
                placeholder={`Enter your ${type} here...`}
                variant='filled'
                label={label}
                margin='normal'
                inputRef={inputRef}
                fullWidth
                onChange={onChange ? onChange : undefined}
            />
        </Fragment>
    )
}


export default Input;