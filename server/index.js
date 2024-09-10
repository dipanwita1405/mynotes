import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dipanwita3018@",  
    database: "notes"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});

// Get all notes
app.get('/', (req, res) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).json({ Error: 'Error fetching notes' });
        }
        console.log('Notes fetched:', data);
        return res.json(data);
    });
});

// Create a new note
app.post('/create', (req, res) => {
    const sql = "INSERT INTO notes (title, content) VALUES (?, ?)";
    const values = [
        req.body.title, 
        req.body.content
    ];
    
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error in creating note:', err);
            return res.status(500).json({ Error: "Error in creating note" });
        }
        console.log('Note created:', data);
        return res.status(201).json(data);
    });
});

// Update a note
app.put('/update/:id', (req, res) => {
    const sql = "UPDATE notes SET title = ?, content = ? WHERE id = ?";
    const values = [
        req.body.title, 
        req.body.content
    ];
    const id = req.params.id;
    
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error('Error in updating note:', err);
            return res.status(500).json({ Error: "Error in updating note" });
        }
        console.log('Note updated:', data);
        return res.json(data);
    });
});

// Delete a note
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM notes WHERE id = ?";
    const id = req.params.id;
    
    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error in deleting note:', err);
            return res.status(500).json({ Error: "Error in deleting note" });
        }
        console.log('Note deleted:', data);
        return res.json(data);
    });
});

// Start the server
app.listen(3030, () => { 
    console.log("Server is running on port 3030");
});
