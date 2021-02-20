import React, { Component } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';

import Card from './Card';

class Home extends Component {
    state = {
        itemService: ItemService.instance,
        codeService: CodeService.instance,
        loading: true,
        boardcode: 'Dev',
    };
    items = [];
    cards = [];
    codes = [];

    componentDidMount() {
        let prArray = [];
        prArray.push(
            this.state.itemService.getAll().then((resp) => {
                this.items = JSON.parse(resp);
            })
        );
        prArray.push(
            this.state.codeService.getAll().then((resp) => {
                this.codes = JSON.parse(resp);
            })
        );
        Promise.all(prArray).then((values) => {
            console.table(this.codes);
            this.getCards(this.state.boardcode);
            this.setState({ loading: false });
        });
    }

    getCards(boardcode) {
        this.cards = this.items.filter((x) => x.boardcode === boardcode);
        console.table(this.cards);
    }

    getSelectOptions(key, codeType) {
        return this.codes
            .filter((x) => x.codetype === codeType)
            .map((x) => {
                return {
                    key: codeType + '_' + x.id,
                    code: x.code,
                };
            });
    }

    render() {
        return (
            <div>
                <div className="home-container">
                    <form>
                        <div className="header">
                            <div className="title">
                                <h5>
                                    Kanban Board - <span className="boardcode">{this.state.boardcode}</span>
                                </h5>
                            </div>
                            <div className="select">
                                <span className="text">Kanban Board</span>
                                <select
                                    className="form-control-inline form-control-sm dropdown"
                                    id="boardcode"
                                    name="boardcode"
                                >
                                    {this.getSelectOptions('id', 'BOARD').map((c) => (
                                        <option key={c.key} value={c.code}>
                                            {c.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="select">
                                <span className="text">Project</span>
                                <select
                                    className="form-control-inline form-control-sm dropdown"
                                    id="projectcode"
                                    name="projectcode"
                                >
                                    {this.getSelectOptions('id', 'PROJECT').map((c) => (
                                        <option key={c.key} value={c.code}>
                                            {c.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                    <div className="main">
                        <div className="column">
                            <div className="header">
                                <div className="title">Open Items</div>
                                <div>
                                    <button
                                        className="btn-edit"
                                        data-title="Edit"
                                        data-toggle="modal"
                                        data-target="#edit"
                                    >
                                        <i className="fa fa-plus fa-xs icon"></i>
                                    </button>
                                </div>
                            </div>
                            <ul className="items">
                                {this.cards
                                    .filter((x) => x.statuscode === 'OPEN')
                                    .map((card, i) => (
                                        <Card key={i} item={card} />
                                    ))}
                            </ul>
                        </div>
                        <div className="column">
                            <div className="header">
                                <div className="title">Assigned</div>
                                <div>
                                    <button
                                        className="btn-edit"
                                        data-title="Edit"
                                        data-toggle="modal"
                                        data-target="#edit"
                                    >
                                        <i className="fa fa-plus fa-xs icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="header">
                                <div className="title">In Review</div>
                                <div>
                                    <button
                                        className="btn-edit"
                                        data-title="Edit"
                                        data-toggle="modal"
                                        data-target="#edit"
                                    >
                                        <i className="fa fa-plus fa-xs icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="header">
                                <div className="title">Completed</div>
                                <div>
                                    <button
                                        className="btn-edit"
                                        data-title="Edit"
                                        data-toggle="modal"
                                        data-target="#edit"
                                    >
                                        <i className="fa fa-plus fa-xs icon"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
