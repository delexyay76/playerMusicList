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

app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
});
