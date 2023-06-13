const express = require('express');
const webRouter = require('./routes/web');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", webRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);    
});

