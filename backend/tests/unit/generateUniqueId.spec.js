const genrerateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = genrerateUniqueId();
        console.log(id)
        expect(id).toHaveLength(8)
    })
})