import React, { Component } from 'react';

class CodeSelector extends Component {
    state = {};

    componentDidMount() {}

    render() {
        let cmpStyle = {
            width: 'auto',
            marginRight: '5px',
        };
        return (
            <div style={cmpStyle}>
                <select
                    className="form-control-inline form-control-sm"
                    id={this.props.name}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(this.props.name, e)}
                >
                    {this.props.options.map((c) => (
                        <option key={c.key} value={c.code}>
                            {c.code}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}

export default CodeSelector;
