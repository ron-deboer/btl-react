import React, { Component } from 'react';

class SelectCode extends Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <div className="select">
                <span className="text">{this.props.caption}</span>
                <select
                    className="form-control-inline form-control-sm dropdown"
                    id={this.props.name}
                    name={this.props.name}
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

export default SelectCode;
