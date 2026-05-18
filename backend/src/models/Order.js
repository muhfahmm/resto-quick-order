// Database schema model for Order entity (Prisma / Mongoose / Sequelize lookalike)
class Order {
  constructor(tableNo, items, total, customerName) {
    this.tableNo = tableNo;
    this.items = items; // Array of items
    this.total = total;
    this.customerName = customerName;
    this.status = 'pending'; // pending | cooking | ready | completed
    this.createdAt = new Date();
  }
}

module.exports = Order;
