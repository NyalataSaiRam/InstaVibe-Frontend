export interface commentsListModal {
    id: number;
    userid: number;
    text: string;
    author: string;
    date: string;
    parent: number | null;
}


export const commentsList:commentsListModal[] = [
    {
        id: 1,
        userid: 2,
        text: 'This is a comment',
        author: 'John Doe',
        date: '2020-01-01',
        parent: null
    },
    {
        id: 2,
        userid: 1,
        text: 'This is a comment',
        author: 'aon Doe',
        date: '2020-01-01',
        parent: null
    },
    {
        id: 3,
        userid: 3,
        text: 'This is a comment',
        author: 'pan Doe',
        date: '2020-01-01',
        parent: null
    },
    {
        id: 4,
        userid: 2,
        text: 'This is a comment',
        author: 'kun Doe',
        date: '2020-01-01',
        parent: null
    },
    {
        id: 5,
        userid: 1,
        text: 'This is a comment',
        author: 'joe Doe',
        date: '2020-01-01',
        parent: null
    },
    {
        id: 6,
        userid: 4,
        text: 'This is a comment',
        author: 'fran Doe',
        date: '2020-01-01',
        parent: 1
    },
    {
        id: 7,
        userid: 2,
        text: 'This is a comment',
        author: 'san Doe',
        date: '2020-01-01',
        parent: 1
    },
    {
        id: 8,
        userid: 1,
        text: 'This is a comment',
        author: 'tuh Doe',
        date: '2020-01-01',
        parent: null
    },
    {
        id: 9,
        userid: 3,
        text: 'This is a comment',
        author: 'mun Doe',
        date: '2020-01-01',
        parent: null
    },
    {
        id: 10,
        userid: 2,
        text: 'This is a comment',
        author: 'wan Doe',
        date: '2020-01-01',
        parent: null
    },
]