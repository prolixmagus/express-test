import * from 'dotenv'
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();
let familyData = '';

fs.readFile('./families.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
    familyData = JSON.parse(data);
    familyData.sort((a, b) => a.family.localeCompare(b.family));
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 1982;

// auto serve up static files in the public directory
app.use(express.static('public'));
app.use(express.static('css'));

// Set up ejs view engine

app.set('view engine', 'ejs');

// Page routing
app.get('/', function(request, response) {
	//can send in a variable or list or complex object
	response.render('home', { 
        pageName: 'The Family Tree', 
        intro: 'default', 
    });
})

app.get('/language-list', function(request, response) {
    //can send in a variable or list or complex object
    response.render('language-list', { 
        pageName: 'default', 
        intro: 'default', 
        familyData: familyData
    });
})

app.get('/detail/:slug', function(request, response) {
    const family = familyData.find((family) => family.slug === request.params.slug);
    response.render('detail', { family })
})

// If no route defined ... 404 error
app.use(function(request, response) {
  response.status(404).render('error404', {query : request.url});
})

app.listen(port, function(error) {
	if (error) console.log(error)
	console.log(`Server listening on PORT: ${port}`)
});



