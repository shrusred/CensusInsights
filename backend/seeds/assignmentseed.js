/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("assignment").del();
  await knex("assignment").insert([
    {
      fieldagentid: "1",
      street: "15 Brookbank Crt",
      city: "Markham",
      province: "Ontario",
      postalcode: "L3P6K9",
      latitude: 43.88513,
      longitude: -79.27463,
    },
    {
      fieldagentid: "1",
      street: "55 Shady Lane Cres",
      city: "Markham",
      province: "Ontario",
      postalcode: "L3T3W6",
      latitude: 43.82539,
      longitude: -79.40944,
    },
  ]);
};
