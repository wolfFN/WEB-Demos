const request = require('supertest');
const server = require('../app.js');

beforeAll(async () => {
    console.log('Jest starting!');
});

afterAll(() => {
    server.close();
    console.log('server closed!');
});

describe('jindan route tests', () => {
    test('get jiandan imgs route GET /jiandan/imgs', async () => {
        const response = await request(server).get('/jiandan/imgs');
        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json');
        const { info, results } = response.body;
        expect(info.size).toEqual(results.length);
    });

    // test('post home route POST /', async () => {
    //     const response = await request(server).post('/');
    //     expect(response.status).toEqual(200);
    //     expect(response.text).toContain('Hello World!');
    // });
});

// describe('dog tests', () => {
//     test('get all dogs  GET /dogs', async () => {
//         const response = await request(server).get('/dogs');
//         expect(response.status).toEqual(200);
//         expect(response.text).toContain('affenpinscher');
//     });
// });
