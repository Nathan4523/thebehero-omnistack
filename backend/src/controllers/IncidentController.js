const connection = require('../database/connection');

module.exports = {
    /**
 * Function to list all datas
 * 
 * @param {*} request 
 * @param {*} response
 */
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count(); //mesma coisa do que count[0]

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.city', 'ongs.whatsapp', 'ongs.uf']);

        //para mostrar sempre o taotal de registro, sempre enviar no header da requisição
        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    /**
     * Function to create the data
     * 
     * @param {*} request 
     * @param {Json} response 
     */
    async store(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title, description, value, ong_id
        });

        return response.json({ id });
    },

    /**
     * 
     * @param {*} request
     * @param {*} response 
     */
    async destroy(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação não autorizada' })
        }

        await connection('incidents').where('id', id).delete();

        //204 é quando não tem nenhum conteudo, porem deu certo
        return response.status(204).send();
    }
}