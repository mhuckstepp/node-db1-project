const db = require("../../data/db-config");

const getAll = (query) => {
  console.log(query);
  if (!Object.keys(query).length) {
    return db("accounts");
  } else {
    return db("accounts")
      .orderBy(query.sortby, query.sortdir)
      .limit(query.limit);
  }
};

const getById = (id) => {
  return db("accounts").first().where({ id });
  // return db.raw(`select * from accounts where id = ${id}`);
};

const create = async (account) => {
  const [id] = await db("accounts").insert({
    name: account.name.trim(),
    budget: account.budget,
  });
  return getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where({ id }).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  const res = await getById(id);
  await db("accounts").where({ id }).del();
  return res;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
