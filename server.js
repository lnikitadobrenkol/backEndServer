let fs =  require('fs');
let data = fs.readFileSync('words.json');
let words = JSON.parse(data);

console.log(words);
// console.log('server is starting');

const express = require('express');

const app = express();

const server = app.listen(3000, listening);

function listening() {
    console.log("Listening...");
}

app.use(express.static('website'));

app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
    let data = request.params;
    let word = data.word;
    let score = Number(data.score);
    let reply;
    if (!score) {
         reply =  {
            msg: "Score is required."
        };
         response.send(reply);
    } else {
        words[word] = score;
        let data = JSON.stringify(words, null, 2);

        fs.writeFile('words.json', data, finished);

        function finished(err) {
            console.log('all set.');
            reply =  {
                word: word,
                score: score,
                status: "success"
            };
            response.send(reply);
        }
    }
}

app.get('/all', sendAll);

function sendAll(request, response) {
    response.send(words);
}

app.get('/search/:word/', searchWord);

function searchWord(request, response) {
    let word = request.params.word;
    let reply;
    if (words[word]) {
        reply = {
            status: "found",
            word: word,
            score: words[word]
        }
    } else {
        reply = {
            status: "not found",
            word: word
        }
    }
    response.send(reply);
}
