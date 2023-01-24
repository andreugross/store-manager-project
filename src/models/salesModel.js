const connection = require('./connection');

const getAllSales = async () => {
  const query = ` SELECT SP.sale_id AS saleId, S.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id
    ORDER BY SP.sale_id ASC, SP.product_id ASC;`;
  const [sales] = await connection.execute(query);

  return sales;
};
const getSalesById = async (id) => {
  const query = ` SELECT S.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales_products AS SP
    INNER JOIN StoreManager.sales AS S
    ON SP.sale_id = S.id
    WHERE SP.sale_id = ?
    ORDER BY SP.sale_id ASC, SP.product_id ASC;`;
  const [sales] = await connection.execute(query, [id]);
  if (sales.length === 0) return null;

  return sales;
};

module.exports = {
  getAllSales,
  getSalesById,
};
