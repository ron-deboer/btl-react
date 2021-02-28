import React, { useState, useEffect } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';
import Column from './Column';
import SelectCode from './Selectcode';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';
import withAppStore from '../../_store/withappstore';

import './home.scss';
import './card.scss';

const Home = (props) => {
    const [boardcode, setBoardCode] = useState('Dev');
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [codes, setCodes] = useState([]);
    const [cards, setCards] = useState([]);
    const [itemService, setItemService] = useState(ItemService.instance);
    const [codeService, setCodeService] = useState(CodeService.instance);

    useEffect(() => {
        console.log('useEffect');
        fetchData();
        // MessageBus.listenFor(AppConstants.MSG_REFRESH_DATA, (payload) => {
        //     if (payload.target.indexOf('home') > -1) {
        //         fetchData();
        //         setLoading(new Date().getTime());
        //     }
        // });
    }, []);

    const fetchData = () => {
        let prArray = [];
        prArray.push(
            itemService.getAll().then((resp) => {
                setItems(() => resp);
                return resp;
            })
        );
        prArray.push(
            codeService.getAll().then((resp) => {
                setCodes(() => resp);
                return resp;
            })
        );
        Promise.all(prArray).then((values) => {
            console.log('values', values);
            console.log('222', codes);
            console.log('333', items);
            getCards(boardcode);
            setLoading(new Date().getTime());
        });
    };

    const getCards = (boardcode) => {
        setCards(items.filter((x) => x.boardcode === boardcode));
    };

    const getSelectOptions = (key, codeType) => {
        return codes
            .filter((x) => x.codetype === codeType)
            .map((x) => {
                return {
                    key: codeType + '_' + x.id,
                    code: x.code,
                };
            });
    };

    const handleChange = (name, e) => {
        getCards(e.target.value);
        setBoardCode(e.target.value);
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
                <Column title="Open" items={cards.filter((x) => x.statuscode === 'Open')} />
                <Column title="Assigned" items={cards.filter((x) => x.statuscode === 'Assigned')} />
                <Column title="In Review" items={cards.filter((x) => x.statuscode === 'Review')} />
                <Column title="Closed" items={cards.filter((x) => x.statuscode === 'Closed')} />
            </div>
        </div>
    );
};

export default withAppStore(Home);
