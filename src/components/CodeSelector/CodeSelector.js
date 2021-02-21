import React, { Component } from 'react';

class CodeSelector extends Component {
    state = {};

    componentDidMount() {}

    render() {
        let cmpStyle = {
            width: '80%',
            margin: 'auto',
            maxHeight: '100vh',
            minHeight: '100vh',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
        };
        return (
            <div style={cmpStyle}>
                <select
                    className="form-control-inline form-control-sm dropdown"
                    id={this.props.name}
                    name={this.props.name}
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
