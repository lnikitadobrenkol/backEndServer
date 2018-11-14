function setup() {
    noCanvas();

    // This is all for submitting a new word

    // Word from user
    let wordinput = select('#word');
    // Score from user
    let scoreinput = select('#score');
    let scoreit = select('#scoreit');
    scoreit.mousePressed(submitscore);

    // Submit the score to the API
    function submitscore() {
        // Make the url
        let url = '/add/' + wordinput.value() + '/' + scoreinput.value();
        // Use loadJSON
        loadJSON(url, submitted);
        function submitted(result) {
            // Just look at the reply in the console
            console.log(result);
        }
    }
}
