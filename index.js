const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the soundStorage directory
app.use('/soundStorage', express.static(path.join(__dirname, 'soundStorage')));

// Endpoint to get the list of audio files
app.get('/api/audio-files', (req, res) => {
    const audioDir = path.join(__dirname, 'soundStorage');
    fs.readdir(audioDir, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading audio directory');
        }
        // Filter for audio files (e.g., .mp3)
        const audioFiles = files.filter(file => file.endsWith('.mp3'));
        res.json(audioFiles);
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'script.js'));
});

app.listen(PORT, () => {
    console.log(`running on http://localhost:${PORT}`);
    require('./app.js')
});

