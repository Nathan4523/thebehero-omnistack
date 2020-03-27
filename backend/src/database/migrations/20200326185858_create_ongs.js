
exports.up = function(knex) {
  /**
   * Para executar o up, basta digitar $ npx knex migrate:latest
   */
  return knex.schema.createTable('Ongs', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  /**
   * Para executar o down, basta digitar $ npx knex migrate:rollback
   */
    return knex.schema.dropTable('Ongs')
};
