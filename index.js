const mysql = require('mysql2');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'lisa',
    password: '0244425513',
    database: 'quizdb'
});
// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});
// Endpoint to handle quiz response
app.post('/submit-response', (req, res) => {
    console.log(req.body);
    const { user_id, question_id, selected_option } = req.body;

// Insert response into the database
const query = 'INSERT INTO responses (user_id, question_id, selected_option) VALUES (?, ?, ?)';
db.query(query, [user_id, question_id, selected_option], (err, result) => {
    if (err) {
        console.error('Error inserting response into database:', err);
        return res.status(500).send('Error saving response');
    }
    res.send('Response saved successfully');
});
});

app.get('/questions', (req, res) => {
    const questionQuery = 'SELECT * From questions_answers';

    db.query(questionQuery, (err, result) => {
        if (err) {
            console.error('Error inserting response into database:', err);
            return res.status(500).send('Error getting questions', err);
        }
        res.send(result);
        });
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
