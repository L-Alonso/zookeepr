const express = require('express');
const { animals } = require('./:Data/animals.json');

const PORT = process.env.PORT || 3001;

const app = express();



function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if(query.personalityTraitsArray){
        //save personalityTraits as a deicated array.
        //if personalityTraits is a string, place it into a new array and save.
        if(typeof query.personalityTraitsArray === 'string'){
            personalityTraitsArray = [query.personalityTraits];
        }else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal in the filteredResults.
            //Remember, it is initially a copy of tehe animalsArray.
            //but here we're updating it for each trait in the .forEach() loop.
            //For each trait being targeted by the filter, the filteredResults,
            //so at the end we'll have an array of animals that have every one 
            //of the traits when .forEach() loop is finished.
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if(query.diet){
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species){
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name){
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}


app.get('/api/animals',(req, res) => {
    let results = animals;
    if(req.query){
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
app.listen(PORT, () =>{
    console.log(`API server now on port ${port}!`);
});