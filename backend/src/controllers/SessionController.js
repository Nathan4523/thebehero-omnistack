const connection = require('../database/connection');

module.exports = {
    /**
     * Function to create the data
     * 
     * @param {*} request 
     * @param {Json} response 
     */
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs').where('id', id).select('name').first();

        if(!ong){
            return response.status(400).json({ error: 'Ong não encontrada com esse id' });
        }

        return response.json(ong);
    },
}