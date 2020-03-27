// const Ong = require('../models/Category');
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
        /**
     * Function to list all datas
     * 
     * @param {*} request 
     * @param {*} response
     */
    async index(request, response) {
        const ongs = await connection('ongs').select('*')
   
        return response.json(ongs);
    },

    /**
     * Function to list only data
     * 
     * @param {number} req 
     * @param {Array} res 
     */
    async show(req, res) {
        
    },

    /**
     * Function to create the data
     * 
     * @param {null} request 
     * @param {Array} response 
     */
    async store(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id, name, email, whatsapp, city, uf
    });

    return response.json({ id });
    },

    /**
     * Function update the specific data 
     * 
     * @param {number} req 
     * @param {Array} res 
     */
    async update(req, res) {
       
    },

    /**
     * Function to delete the specifc data 
     * This function just fills the field deleted_at  , if field is filled it won't show in other functions 
     * 
     * @param {number} req 
     * @param {Date} res 
     */
    async delete(req, res) {
        
    }
}