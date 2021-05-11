import { TextField } from '@material-ui/core';
import InputMask from "react-input-mask";

export default function MaskedInput(props) {
    const {
        onChange,
        value,
        name,
        type,
        mask,
        label,
        fullWidth
} = props

    return (
        <InputMask
            onChange={onChange}
            value={value}
            name={name}
            type={type ? type : "text"}
            mask={mask ? mask : ""}>
            {() =>
                <TextField
                    fullWidth={fullWidth ? fullWidth : false}
                    variant="outlined"
                    label={label ? label : ""}
                    value={value}
                    name={name}
                    type={type ? type : "text"}
                />
            }
        </InputMask>
    )
}