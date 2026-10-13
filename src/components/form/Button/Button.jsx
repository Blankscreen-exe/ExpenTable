import "../../../static/css/Button.css";

function Button({ className = "", type = "button", content, ...rest}) {
    return (
        <button 
            className={`button ${className}`}  
            type={type}
            {...rest}
        >
            {content}
        </button>    
    )
}

export default Button;