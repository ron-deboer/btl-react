import React, { useState, useEffect } from 'react';

import Column from './Column';
import SelectCode from './Selectcode';
import withAppStore from '../../_store/withappstore';

import './home.scss';
import './card.scss';

const Home = (props) => {
    const [boardcode, setBoardCode] = useState('Dev');
    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);

    // didMount
    useEffect(() => {
        getCards(boardcode);
        setLoading(new Date().getTime());
    }, []);

    // onUpdate
    useEffect(() => {
        getCards(boardcode);
        setLoading(new Date().getTime());
    }, [props.appStore.codes, props.appStore.items]);

    const getCards = (boardcode) => {
        setCards(props.appStore.items.filter((x) => x.boardcode === boardcode));
    };

    const getSelectOptions = (key, codeType) => {
        return props.appStore.codes
            .filter((x) => x.codetype === codeType)
            .map((x) => {
                return {
                    key: codeType + '_' + x.id,
                    code: x.code,
                };
            });
    };

    const handleChange = (name, e) => {
        if (name === 'boardcode') {
            setBoardCode(e.target.value);
            getCards(e.target.value);
        }
    };

    if (loading === false) {
        return <h4>Loading...</h4>;
    }

    return (
        <div className="home-container">
            <form>
                <div className="header">
                    <div className="title">
                        Kanban Board - <span className="boardcode">{boardcode}</span>
                    </div>
                    <SelectCode
                        caption="Kanban Board"
                        name="boardcode"
                        options={getSelectOptions('id', 'BOARD')}
                        onChange={handleChange}
                    />
                    <SelectCode
                        caption="Project"
                        name="projectcode"
                        options={getSelectOptions('id', 'PROJECT')}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <div className="main">
                <Column
                    title="Open"
                    items={cards.filter((x) => x.statuscode === 'Open')}
                    statuscode="Open"
                    boardcode={boardcode}
                />
                <Column
                    title="Assigned"
                    items={cards.filter((x) => x.statuscode === 'Assigned')}
                    statuscode="Assigned"
                    boardcode={boardcode}
                />
                <Column
                    title="In Review"
                    items={cards.filter((x) => x.statuscode === 'Review')}
                    statuscode="Review"
                    boardcode={boardcode}
                />
                <Column
                    title="Closed"
                    items={cards.filter((x) => x.statuscode === 'Closed')}
                    statuscode="Closed"
                    boardcode={boardcode}
                />
            </div>
        </div>
    );
};

export default withAppStore(Home);
