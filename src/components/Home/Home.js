import React, { Component } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';

import Column from './Column';
import SelectCode from './Selectcode';

import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import withAppStore from '../../_store/withappstore';

import './home.scss';
import './card.scss';

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

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchData();
        MessageBus.listenFor(AppConstants.MSG_REFRESH_DATA, (payload) => {
            if (payload.target.indexOf('home') > -1) {
                this.fetchData();
                this.setState({ loading: new Date().getTime() });
            }
        });
    }

    componentDidUpdate(prevProps) {}

    fetchData() {
        let prArray = [];
        prArray.push(
            this.state.itemService.getAll().then((resp) => {
                this.items = resp;
            })
        );
        prArray.push(
            this.state.codeService.getAll().then((resp) => {
                this.codes = resp;
            })
        );
        Promise.all(prArray).then((values) => {
            this.getCards(this.state.boardcode);
            this.setState({ loading: new Date().getTime() });
        });
    }

    getCards(boardcode) {
        this.cards = this.items.filter((x) => x.boardcode === boardcode);
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

    handleChange = (name, e) => {
        this.getCards(e.target.value);
        this.setState({ boardcode: e.target.value });
    };

    render() {
        const { user } = this.props.appStore;
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
                            onChange={this.handleChange}
                        />
                        <SelectCode
                            caption="Project"
                            name="projectcode"
                            options={this.getSelectOptions('id', 'PROJECT')}
                            onChange={this.handleChange}
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

export default withAppStore(Home);
