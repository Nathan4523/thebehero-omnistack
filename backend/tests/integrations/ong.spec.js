// para testar as requisicoes, instalar a lib subpertest
const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');
describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    // afterEach
    afterAll(async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        // .set('Authorization', 'asf')
        .send({
            name: "APAD2",
            email: "contato@apad.com",
            whatsapp: "47000009",
            city: "São bernardo do campo",
            uf: "SP"
        });

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})