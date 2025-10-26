const express = require('express');
const cors = require('cors');
const route = require('./routes/myRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', route);

const port = 3000;

app.listen(port, () => console.log(`server running on port ${port}`));
