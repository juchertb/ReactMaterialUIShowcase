import generateCustomers from "./customers";
import generateCategories from "./categories";
import generateCollections from "./collections";
import generateColors from "./colors";
import generateProducts from "./products";
import generateCommands from "./commands";
import generateInvoices from "./invoices";
import generateReviews from "./reviews";
import finalize from "./finalize";
import generateOrders from "./orders";
import generateCustomerOrders from "./customerOrders";

export default (options = { serializeDate: true }) => {
  const db = {};
  db.customers = generateCustomers(db, options);
  db.categories = generateCategories();
  db.collections = generateCollections();
  db.colors = generateColors();
  db.products = generateProducts(db);
  db.commands = generateCommands(db, options);
  db.invoices = generateInvoices(db);
  db.reviews = generateReviews(db, options);
  db.orders = generateOrders(db, options);
  db.customerOrders = generateCustomerOrders(db, options);
  finalize(db);

  return db;
};
