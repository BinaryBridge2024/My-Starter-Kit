const express = require('express');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
