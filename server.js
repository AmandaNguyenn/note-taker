const express = require('express');

//create server instance
const app = express();

//PORT define number
const PORT = process.env.PORT || 3000;

//body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//lets make the public assets accessible
app.use(express.static('./public'));

//include route
app.use(require('./routes/apiRoutes'));
app.use(require('./routes/htmlRoutes'));

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
});