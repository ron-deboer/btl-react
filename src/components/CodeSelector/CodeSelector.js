import React from 'react';

const CodeSelector = (props) => {
    const cmpStyle = {
        width: 'auto',
        marginRight: '5px',
    };
    return (
        <div style={cmpStyle}>
            <select
                className="form-control-inline form-control-sm"
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={(e) => props.onChange(props.name, e)}
            >
                {props.options.map((c) => (
                    <option key={c.key} value={c.code}>
                        {c.code}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CodeSelector;
