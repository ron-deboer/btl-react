import React, { Component } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';

import Column from './Column';
import SelectCode from './Selectcode';

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
            <div className="home-container">
                <form>
                    <div className="header">
                        <div className="title">
                            <h5>
                                Kanban Board - <span className="boardcode">{this.state.boardcode}</span>
                            </h5>
                        </div>
                        <SelectCode
                            caption="Kanban Board"
                            name="boardcode"
                            options={this.getSelectOptions('id', 'BOARD')}
                        />
                        <SelectCode
                            caption="Project"
                            name="projectcode"
                            options={this.getSelectOptions('id', 'PROJECT')}
                        />
                    </div>
                </form>
                <div className="main">
                    <Column title="Open" items={this.cards.filter((x) => x.statuscode === 'Open')} />
                    <Column title="Assigned" items={this.cards.filter((x) => x.statuscode === 'Assigned')} />
                    <Column title="In Review" items={this.cards.filter((x) => x.statuscode === 'Review')} />
                    <Column title="Closed" items={this.cards.filter((x) => x.statuscode === 'Closed')} />
                </div>
            </div>
        );
    }
}

export default Home;
