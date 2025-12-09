const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Sale = require('../models/Sale');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/retail_sales';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const csvPath = path.join(__dirname, '../../data/truestate_assignment_dataset.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('CSV file not found:', csvPath);
      process.exit(1);
    }

    console.log('Clearing existing data...');
    await Sale.deleteMany({});

    console.log('Parsing and inserting CSV in batches...');
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    const BATCH_SIZE = 5000;
    let inserted = 0;
    let batch = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Parse line handling quoted fields
      const values = [];
      let current = '';
      let inQuotes = false;
      
      for (const char of line) {
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());

      const row = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx] || '';
      });

      batch.push({
        customerId: row['Customer ID'],
        customerName: row['Customer Name'],
        phoneNumber: row['Phone Number'],
        gender: row['Gender'],
        age: parseInt(row['Age']) || 25,
        customerRegion: row['Customer Region'],
        customerType: row['Customer Type'],
        productId: row['Product ID'],
        productName: row['Product Name'],
        brand: row['Brand'],
        productCategory: row['Product Category'],
        tags: row['Tags'] ? row['Tags'].split(',').map(t => t.trim()) : [],
        quantity: parseInt(row['Quantity']) || 1,
        pricePerUnit: parseFloat(row['Price per Unit']) || 0,
        discountPercentage: parseFloat(row['Discount Percentage']) || 0,
        totalAmount: parseFloat(row['Total Amount']) || 0,
        finalAmount: parseFloat(row['Final Amount']) || 0,
        date: new Date(row['Date']),
        paymentMethod: row['Payment Method'],
        orderStatus: row['Order Status'],
        deliveryType: row['Delivery Type'],
        storeId: row['Store ID'],
        storeLocation: row['Store Location'],
        salespersonId: row['Salesperson ID'],
        employeeName: row['Employee Name']
      });

      if (batch.length >= BATCH_SIZE) {
        await Sale.insertMany(batch, { ordered: false });
        inserted += batch.length;
        process.stdout.write(`\rInserted ${inserted} records...`);
        batch = [];
      }
    }

    // Insert remaining
    if (batch.length > 0) {
      await Sale.insertMany(batch, { ordered: false });
      inserted += batch.length;
    }

    console.log(`\n✓ Database seeded with ${inserted} records`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed.');
    process.exit(0);
  }
};

seedDatabase();
