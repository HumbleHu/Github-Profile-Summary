const express = require('express');
const app = express();
const path = require('path');

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(8000);

//pages
app.get('/',(req,res)=>{
      res.render('popup');
});