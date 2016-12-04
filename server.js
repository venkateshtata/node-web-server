const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = now;


  console.log(' '+now+ ' '+req.method+' '+req.url);

  fs.appendFile('server.log',log+' '+req.method+' '+req.url+'\n',(err)=>{
    if(err){
      console.log('unable to append to server');
    }
  });


  next();
});

// app.use((req, res, next)=>{
//   res.render('maintanance.hbs');
// });


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()

});

app.get('/', (req,res) =>{
  //res.send('<h1>hello express</h1>');
res.render('welcome.hbs',{
    pageTitle: 'Welcome',
  //currentYear:new Date().getFullYear()
});
});
app.get('/about', (req, res)=>{
res.render('about.hbs',{
  pageTitle: 'Welcome'
  //currentYear: new Date().getFullYear()
});
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    pageTitle: 'Projects'
  });
});

app.get('/bad',(req, res) =>{
  res.send({
  errorMessage:'unable to handle request'
});
});

app.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});
