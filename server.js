const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'receipts_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
});

app.post('/create-receipt', (req, res) => {
    const { customer_id, total_amount, items } = req.body;
    db.query('INSERT INTO receipts (customer_id, total_amount) VALUES (?, ?)', [customer_id, total_amount], (err, result) => {
        if (err) throw err;
        const receipt_id = result.insertId;
        items.forEach(item => {
            db.query('INSERT INTO items (receipt_id, name, price) VALUES (?, ?, ?)', [receipt_id, item.name, item.price]);
        });
        res.send('Receipt created!');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
