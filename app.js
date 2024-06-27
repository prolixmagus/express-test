import * as dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import contentful from 'contentful';
// import feet from './families.json' with { "type": "json"};


//for CMS
const client = contentful.createClient({
  space: 'hjp080e02fag',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'tDCw5s7UkwTWtLsEpdIXR_Go8xmmBHTeQ3G7fQXARY0'
})


//for Railway
dotenv.config();


//call json data
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let familyData = '';

fs.readFile('./families.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
    familyData = JSON.parse(data);
    familyData.sort((a, b) => a.name.localeCompare(b.name));
});


//set up express
const app = express();
const port = process.env.PORT || 1982;


//set up ejs
app.set('view engine', 'ejs');


// auto serve up static files in the public directory
app.use(express.static('public'));
app.use(express.static('css'));


// Page routing
app.get('/', function(request, response) {
	client.getEntry('1TP4y5ICz7rd5HwZnn5eMX')
  .then((entry) => {
    response.render('home', { page: entry.fields });
  })
  .catch(console.error)
})

app.get('/language-list', function(request, response) {
  client.getEntries({
    content_type: 'family'
  })
  .then(function (data) {
    const familyData = data.items.map ((item) => {
      return {
        id: item.sys.id,
        name: item.fields.name,
        mostSpoken: item.fields.mostSpoken,
        population: item.fields.population,
        languages: item.fields.languages,
        image: item.fields.image.fields.file.url,
        synthetic: item.fields.synthetic,
        countries: item.fields.countries,
        location: item.fields.location
      }
    });
    response.render('language-list', {family : familyData});
  });
})

app.get('/detail/:id', function(request, response) {
  client.getEntries({
    content_type: 'family'
  })
  .then(function (data) {
    const familyData = data.items.map ((item) => {
      return {
        id: item.sys.id,
        name: item.fields.name,
        mostSpoken: item.fields.mostSpoken,
        population: item.fields.population,
        languages: item.fields.languages,
        image: item.fields.image.fields.file.url,
        description: item.fields.image.fields.description,
        alt: item.fields.image.fields.title,
        synthetic: item.fields.synthetic,
        countries: item.fields.countries,
        location: item.fields.location
      }
    });
    const family = familyData.find((family) => family.id === request.params.id);
    response.render('detail', { family });
  })
});;

// If no route defined ... 404 error
app.use(function(request, response) {
  response.status(404).render('error404', {query : request.url});
})

app.listen(port, function(error) {
	if (error) console.log(error)
	console.log(`Server listening on PORT: ${port}`)
});

