const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { animals } = require('./data/animals');

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];

    // this saves animalsArray as filteredResults
    let filteredResults = animalsArray;

    if (query.personalityTraits) {
        // save personalityTraits as a dedicated array
        // if personalityTraits is a strng, place in new array and save
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }

        // loop through each trait in personalityTraits array
        personalityTraitsArray.forEach(trait => {
            // check the trait against each animal in filteredResults array
            // remember its initially a copy of animalsArray
            // but we're updating it for each trail in .forEach() loop
            // for each trait being targeted by filter, filteredResults
            // array will then contain only the entries that contain trait.
            // at the end, we'll have an array of animals that have every one
            // of the traits when .forEach() loop is finished
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result){
        res.json(result);
    } else {
        res.json(404);
    } 
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
