const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;
const connectDB = require('./configs/db');
connectDB();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/contacts', require('./routes/contactRoutes'));  
app.use('/api/users', require('./routes/userRoutes'));  

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 