function Select({className = "", options, placeholder, ...rest}) {
    return (
        <select 
            className={`is-radiusless ${className}`}
            {...rest}>
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option, index) => {
                    return (
                        <option value={option} key={index}>
                            {option}
                        </option>
                    );
                })}
        </select>
    )
}

export default Select;