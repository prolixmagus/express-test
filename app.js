import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const familyData = [
    {
        "id": "A1",
        "slug": "uzo-aztecan",
        "family": "Uto-Aztecan Languages",
        "languages": ["Nahuatl", "Huichol", "Yaqui", "Comanche"],
        "countries": ["Mexico", "United States", "Honduras", "Nicaragua"],
        "mostSpoken": "Nahuatl",
        "population": "1.5 million",
        "location": ["North America"],
        "image" : {
            "figure": "/images/uzo-aztecan.png",
            "figcaption": "Nahuatl was the language of the Aztec Empire and continues to be spoken and taught today.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A2",
        "slug": "sino-tibetan",
        "family": "Sino-Tibetan Languages",
        "languages": ["Mandarin", "Cantonese", "Burmese", "Tibetan"],
        "countries": ["China", "Myanmar", "Nepal", "India"],
        "mostSpoken": "Mandarin",
        "population": "1.5 billion",
        "location": ["Asia"],
        "image" : {
            "figure": "/images/sino-tibetan.png",
            "figcaption": "Mandarin Chinese is the most spoken language in the world by native speakers.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A3",
        "slug": "romance",
        "family": "Romance Languages",
        "languages": ["Spanish", "Portuguese", "French", "Italian"],
        "countries": ["Spain", "Brazil", "France", "Italy"],
        "mostSpoken": "Spanish",
        "population": "1.2 billion",
        "location": ["Europe"],
        "image" : {
            "figure": "/images/romance.png",
            "figcaption": "The Romance languages evolved from Vulgar Latin.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A4",
        "slug": "afroasiatic",
        "family": "Afroasiatic Languages",
        "languages": ["Arabic", "Amharic", "Somali", "Hebrew"],
        "countries": ["Egypt", "Ethiopia", "Somalia", "Israel"],
        "mostSpoken": "Arabic",
        "population": "495 million",
        "location": ["Africa"],
        "image" : {
            "figure": "/images/afroasiatic.png",
            "figcaption": "Arabic is the liturgical language of over 1.8 billion Muslims worldwide.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A5",
        "slug": "germanic",
        "family": "Germanic Languages",
        "languages": ["English", "German", "Dutch", "Swedish"],
        "countries": ["United States", "Germany", "Netherlands", "Sweden"],
        "mostSpoken": "English",
        "population": "2.4 billion",
        "location": ["Europe"],
        "image" : {
            "figure": "/images/germanic.png",
            "figcaption": "English has the largest vocabulary of any language with over 1 million words.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A6",
        "slug": "austronesian",
        "family": "Austronesian Languages",
        "languages": ["Javanese", "Tagalog", "Malagasy", "Malay"],
        "countries": ["Indonesia", "Philippines", "Madagascar", "Malaysia"],
        "mostSpoken": "Javanese",
        "population": "386 million",
        "location": ["Southeast Asia, Africa"],
        "image" : {
            "figure": "/images/austronesian.png",
            "figcaption": "The Austronesian language family spread across the islands of the Pacific through seafaring.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A7",
        "slug": "uralic",
        "family": "Uralic Languages",
        "languages": ["Hungarian", "Finnish", "Estonian", "Sami"],
        "countries": ["Hungary", "Finland", "Estonia", "Norway"],
        "mostSpoken": "Hungarian",
        "population": "25 million",
        "location": ["Europe"],
        "image" : {
            "figure": "/images/uralic.png",
            "figcaption": "The Uralic language family includes Finnish, Hungarian, and Estonian, spoken primarily in northern Europe and western Siberia.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A8",
        "slug": "altaic",
        "family": "Altaic Languages",
        "languages": ["Turkish", "Mongolian", "Azerbaijani", "Kazakh"],
        "countries": ["Turkey", "Mongolia", "Azerbaijan", "Kazakhstan"],
        "mostSpoken": "Turkish",
        "population": "160 million",
        "location": ["Asia"],
        "image" : {
            "figure": "/images/altaic.png",
            "figcaption": "Turkish, a major Altaic language, has influenced cultures from the Ottoman Empire to modern-day Turkey.",
            "alt": "Map of region where languages are spoken"
        }
    }
]

familyData.sort((a, b) => a.family.localeCompare(b.family));

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 1982;

// auto serve up static files in the public directory
app.use(express.static('public'));

// Set up ejs view engine

app.set('view engine', 'ejs');

// Page routing
app.get('/', function(request, response) {
	//can send in a variable or list or complex object
	response.render('home', { 
        pageName: 'The Family Tree', 
        intro: 'default', 
        familyData: familyData
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
    console.log(request)
  response.status(404).render('error404', {query : request.url});
})

app.listen(PORT, function(error) {
	if (error) console.log(error)
	console.log(`Server listening on PORT: ${PORT}`)
});



