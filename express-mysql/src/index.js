require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const userRoutes = require('./routes/user.routes');
const middlewareLogRequest = require('./middlewares/log.middleware');
const upload = require('./middlewares/multer.middleware');
const app = express();

// Global middleware
app.use(middlewareLogRequest);
app.use(express.json());

app.use('/users', userRoutes);
/*
Contoh penggunaan middleware pada route tertentu
app.post('/{route}, {middleware}.single({field name}), (req, res) => {}
*/
app.post('/upload', upload.single('photo'), (req, res) => {
    res.status(200).json({
        message: 'Upload file successfully',
    });
});
app.use((err, req, res, next) => {
    res.json({
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`);
});
