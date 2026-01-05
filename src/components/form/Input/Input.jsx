import "../../../static/css/Input.css"

function Input({ type = "text", step = 1, placeholder = "", className = "", ...rest }) {
    return (
        <input 
            type={type} 
            step={step}
            placeholder={placeholder}
            className={`input is-primary is-radiusless ${className}`}
            {...rest}
        />
    )
}

export default Input;