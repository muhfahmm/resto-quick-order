// Handler for order business logic
exports.createOrder = async (req, res) => {
  try {
    const { tableNo, items, total, customerName } = req.body;
    console.log(`Processing order for ${customerName} at table ${tableNo}`);
    
    // Simulate database save
    const mockCreatedOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      tableNo,
      items,
      total,
      customerName,
      status: 'pending',
      createdAt: new Date()
    };
    
    res.status(201).json({ success: true, order: mockCreatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
