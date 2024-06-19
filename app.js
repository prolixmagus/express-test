import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
    
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 1982;

// auto serve up static files in the public directory
app.use(express.static('public'));

// Set up ejs view engine

app.set('view engine', 'ejs');

const families = [
    {
        "id": "A1",
        "family": "Uto-Aztecan Languages",
        "languages": ["Nahuatl", "Huichol", "Yaqui", "Comanche"],
        "countries": ["Mexico", "United States", "Honduras", "Nicaragua"],
        "mostSpoken": "Nahuatl",
        "population": "1.5 million",
        "image" : {
            "figure": "/images/uzo-aztecan.png",
            "figcaption": "Nahuatl, a Uto-Aztecan language, was the language of the Aztec Empire and continues to be spoken by over 1.5 million people today.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A2",
        "family": "Sino-Tibetan Languages",
        "languages": ["Mandarin", "Cantonese", "Burmese", "Tibetan"],
        "countries": ["China", "Myanmar", "Nepal", "India"],
        "mostSpoken": "Mandarin",
        "population": "1.5 billion",
        "image" : {
            "figure": "/images/sino-tibetan.png",
            "figcaption": "Mandarin Chinese, a prominent Sino-Tibetan language, is the most spoken language in the world by native speakers.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A3",
        "family": "Romance Languages",
        "languages": ["Spanish", "Portuguese", "French", "Italian"],
        "countries": ["Spain", "Brazil", "France", "Italy"],
        "mostSpoken": "Spanish",
        "population": "1.2 billion",
        "image" : {
            "figure": "/images/romance.png",
            "figcaption": "The Romance languages evolved from Vulgar Latin and include French, Spanish, Italian, Portuguese, and more.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A4",
        "family": "Afroasiatic Languages",
        "languages": ["Arabic", "Amharic", "Somali", "Hebrew"],
        "countries": ["Egypt", "Ethiopia", "Somalia", "Israel"],
        "mostSpoken": "Arabic",
        "population": "495 million",
        "image" : {
            "figure": "/images/afroasiatic.png",
            "figcaption": "Arabic, an Afroasiatic language, is the liturgical language of over 1.8 billion Muslims worldwide.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A5",
        "family": "Germanic Languages",
        "languages": ["English", "German", "Dutch", "Swedish"],
        "countries": ["United States", "Germany", "Netherlands", "Sweden"],
        "mostSpoken": "English",
        "population": "2.4 billion",
        "image" : {
            "figure": "/images/germanic.png",
            "figcaption": "English, a Germanic language, has the largest vocabulary of any language, with over 1 million words.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A6",
        "family": "Austronesian Languages",
        "languages": ["Javanese", "Tagalog", "Malagasy", "Malay"],
        "countries": ["Indonesia", "Philippines", "Madagascar", "Malaysia"],
        "mostSpoken": "Javanese",
        "population": "386 million",
        "image" : {
            "figure": "/images/austronesian.png",
            "figcaption": "The Austronesian language family includes Hawaiian, Maori, Tagalog, and Indonesian, spread across the islands of the Pacific.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A7",
        "family": "Uralic Languages",
        "languages": ["Hungarian", "Finnish", "Estonian", "Sami"],
        "countries": ["Hungary", "Finland", "Estonia", "Norway"],
        "mostSpoken": "Hungarian",
        "population": "25 million",
        "image" : {
            "figure": "/images/uralic.png",
            "figcaption": "The Uralic language family includes Finnish, Hungarian, and Estonian, spoken primarily in northern Europe and western Siberia.",
            "alt": "Map of region where languages are spoken"
        }
    },
    {
        "id": "A8",
        "family": "Altaic Languages",
        "languages": ["Turkish", "Mongolian", "Azerbaijani", "Kazakh"],
        "countries": ["Turkey", "Mongolia", "Azerbaijan", "Kazakhstan"],
        "mostSpoken": "Turkish",
        "population": "160 million",
        "image" : {
            "figure": "/images/altaic.png",
            "figcaption": "Turkish, a major Altaic language, has influenced cultures from the Ottoman Empire to modern-day Turkey.",
            "alt": "Map of region where languages are spoken"
        }
    }
];


// Page routing
app.get('/', function(request, response) {
	//can send in a variable or list or complex object
	response.render('language-list', { pageName: 'The Family Tree', intro: 'default', families: families } );
})

app.get('/contact', function(request, response) {
	response.render('contact');
})

app.get('/api', function(request, response) {
	response.send({ "name": "Jelene", "occupation": "sexy"})
})

// If no route defined ... 404 error
app.use(function(request, response) {
  response.status(404).send("Sorry can't find that!")
})

app.listen(PORT, function(error) {
	if (error) console.log(error)
	console.log(`Server listening on PORT ${PORT}`)
});



