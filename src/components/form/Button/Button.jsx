import "../../../static/css/Button.css";

function Button({ className = "", type = "button", content, ...rest}) {
    return (
        <button 
            className={`button is-radiusless ${className}`}  
            type={type}
            {...rest}
        >
            {content}
        </button>    
    )
}

export default Button;