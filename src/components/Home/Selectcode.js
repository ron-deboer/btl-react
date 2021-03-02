import React from 'react';

const SelectCode = (props) => {
    return (
        <div className="selectcode">
            <span className="text">{props.caption}</span>
            <select
                className="form-control-inline form-control-sm dropdown"
                id={props.name}
                name={props.name}
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

export default SelectCode;
