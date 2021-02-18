import { IUser, ERole } from '../_interfaces/user';
import { ICode, ECodeType } from '../_interfaces/code';
import { IItem } from '../_interfaces/item';

/**
 * db object and core functions
 */
export let db = null;
export const fetchDb = () => {
    db = JSON.parse(localStorage.getItem('demoDb'));
};
export const persistDb = () => {
    localStorage.setItem('demoDb', JSON.stringify(db));
};
const addDays = (dateIn, days) => {
    return new Date(dateIn.getFullYear(), dateIn.getMonth(), dateIn.getDate() + days);
};
/**
 * fake data
 */
const FAKE_USERS = [
    {
        id: 1,
        username: 'admin',
        name: 'Admin User',
        email: 'admin@mail.com',
        password: 'admin',
        role: ERole.Admin,
        boardcode: 'Dev',
    },
    {
        id: 2,
        username: 'user-1',
        name: 'Regular User 1',
        email: 'user1@mail.com',
        password: 'user-1',
        role: ERole.User,
        boardcode: 'Dev',
    },
    {
        id: 3,
        username: 'dev-luker',
        name: 'Luke Rogers',
        email: 'luker@mail.com',
        password: 'luker',
        role: ERole.User,
        boardcode: 'Dev',
    },
    {
        id: 4,
        username: 'dev-gailp',
        name: 'Gail Parsons',
        email: 'gailp@mail.com',
        password: 'gailp',
        role: ERole.User,
        boardcode: 'Dev',
    },
    {
        id: 5,
        username: 'qa-patches',
        name: 'Patches the Whippet',
        email: 'patches@mail.com',
        password: 'patches',
        role: ERole.User,
        boardcode: 'Dev',
    },
    {
        id: 6,
        username: 'qa-belladb',
        name: 'Bella deBoer',
        email: 'belladb@mail.com',
        password: 'belladb',
        role: ERole.User,
        boardcode: 'Dev',
    },
];

const FAKE_CODES = [
    // kanban board
    {
        id: 1,
        codetype: ECodeType.Board,
        code: 'Dev',
        description: 'Dev board',
    },
    {
        id: 2,
        codetype: ECodeType.Board,
        code: 'Bugs',
        description: 'Bugs board',
    },
    // project
    {
        id: 3,
        codetype: ECodeType.Project,
        code: 'WebUi',
        description: 'Web UI Project',
    },
    {
        id: 4,
        codetype: ECodeType.Project,
        code: 'RestApi',
        description: 'Rest API Project',
    },
    // priority
    {
        id: 5,
        codetype: ECodeType.Priority,
        code: 'High',
        description: 'High Priority',
    },
    {
        id: 6,
        codetype: ECodeType.Priority,
        code: 'Medium',
        description: 'Medium Priority',
    },
    {
        id: 7,
        codetype: ECodeType.Priority,
        code: 'Low',
        description: 'Low Priority',
    },
    // status
    {
        id: 8,
        codetype: ECodeType.Status,
        code: 'Open',
        description: 'Open',
    },
    {
        id: 9,
        codetype: ECodeType.Status,
        code: 'Assigned',
        description: 'Assigned',
    },
    {
        id: 10,
        codetype: ECodeType.Status,
        code: 'Review',
        description: 'Review',
    },
    {
        id: 20,
        codetype: ECodeType.Status,
        code: 'Closed',
        description: 'Closed',
    },
    // size
    {
        id: 21,
        codetype: ECodeType.Size,
        code: 'Small',
        description: 'Small',
    },
    {
        id: 22,
        codetype: ECodeType.Size,
        code: 'Medium',
        description: 'Medium',
    },
    {
        id: 23,
        codetype: ECodeType.Size,
        code: 'Large',
        description: 'Large',
    },
];

const FAKE_ITEMS = [
    {
        id: 1,
        title: 'Develop nav bar',
        disporder: 10001,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'High',
        sizecode: 'Medium',
        statuscode: 'Open',
        createdbyuser: 'user',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: 'luker',
        assignedtimestamp: new Date().toISOString(),
        closedbyuser: '',
        closedtimestamp: '',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 2,
        title: 'Develop CRUD for codes',
        disporder: 10002,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Open',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: '',
        assignedtimestamp: '',
        closedbyuser: '',
        closedtimestamp: '',
        description:
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 3,
        title: 'Develop CRUD for users',
        disporder: 10003,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Open',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: '',
        assignedtimestamp: '',
        closedbyuser: '',
        closedtimestamp: '',
        description:
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 4,
        title: 'Develop CRUD for items',
        disporder: 10004,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Open',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: '',
        assignedtimestamp: '',
        closedbyuser: '',
        closedtimestamp: '',
        description:
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 5,
        title: 'Develop kanban board',
        disporder: 10005,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Open',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: '',
        assignedtimestamp: '',
        closedbyuser: '',
        closedtimestamp: '',
        description:
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 6,
        title: 'Develop ui framework',
        disporder: 10006,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Assigned',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: 'user',
        assignedtimestamp: new Date().toISOString(),
        closedbyuser: '',
        closedtimestamp: '',
        description:
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 7,
        title: 'Develop db schema',
        disporder: 10007,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Closed',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: 'user',
        assignedtimestamp: new Date().toISOString(),
        closedbyuser: 'user',
        closedtimestamp: new Date().toISOString(),
        description:
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 8,
        title: 'Develop web api',
        disporder: 10008,
        boardcode: 'Dev',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Review',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: 'user',
        assignedtimestamp: new Date().toISOString(),
        closedbyuser: '',
        closedtimestamp: '',
        description:
            'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. ',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
    {
        id: 9,
        title: 'Add more padding to item card',
        disporder: 10009,
        boardcode: 'Bugs',
        projectcode: 'WebUi',
        prioritycode: 'Medium',
        sizecode: 'Small',
        statuscode: 'Open',
        createdbyuser: 'admin',
        createdtimestamp: new Date().toISOString(),
        assignedtouser: '',
        assignedtimestamp: '',
        closedbyuser: '',
        closedtimestamp: '',
        description: 'Add more padding to item card in kanban page',
        comments: '',
        duedate: addDays(new Date(), 10).toISOString(),
    },
];
/**
 * initial data load and persist
 */
export const FakeDataLoader = () => {
    let str = localStorage.getItem('demoDb');
    if (!Boolean(str)) {
        let db = {
            users: FAKE_USERS,
            code: FAKE_CODES,
            item: FAKE_ITEMS,
        };
        localStorage.setItem('demoDb', JSON.stringify(db));
    }
    fetchDb();
};
