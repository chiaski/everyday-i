// server.js
// where your node app starts

// init project
var express = require('express');
// setup a new database
// persisted using async file storage
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.

var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)
var app = express();


db.defaults({ votes: [
    ]
  }).write();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get("/votes", function (request, response) {
  var dbUsers=[];
  var users = db.get('votes').value() // Find all users in the collection
  users.forEach(function(item) {
    dbUsers.push([item.index, item.question, item.response, item.yes, item.total]); // adds their info to the dbUsers value
  });
  response.send(dbUsers); // sends dbUsers back to the page
});


// // creates a new entry in the users collection with the submitted values
// app.post("/votes", function (request, response) {
//   db.get('votes')
//     .push({ yes:request.query.question, result: request.query.total })
//     .write()
//   console.log("Vote submitted\n");
//   response.sendStatus(200);
// });

// // removes entries from users and populates it with default users
// app.get("/reset", function (request, response) {
//   // removes all entries from the collection
//   db.get('votes')
//   .remove()
//   .write()
//   console.log("Database cleared");
  
//   // i dump the questions here
//   var rituals = [
//       {"index": 0, "question": "Could you fall in love with someone if you knew them enough?", "response": "", "yes":0, "total":0},
//       {"index": 1, "question": "Do you believe that this could work out?", "response": "", "yes": 0, "total":0},
//       {"index": 2, "question": "Is attention a form of love?", "response": "", "yes": 0, "total":0},
//       {"index": 3, "question": "Does presence mean more than existence in the physical sense, for you?", "response": "", "yes": 0, "total":0},
//       {"index": 4, "question": "Could you truly forgive the person who has wronged you most?", "response": "", "yes": 0, "total":0},
//       {"index": 5, "question": "Would you forgive the person who has wronged you most, over and over?", "response": "", "yes": 0, "total":0},
//       {"index": 6, "question": "Are you actually interested in people without desire for reciprocity?", "response": "", "yes": 0, "total":0},
//       {"index": 7, "question": "Have you answered any questions lately that you've been holding onto for a long time?", "response": "", "yes": 0, "total":0},
//       {"index": 8, "question": "Do you need to have something bigger to believe in?", "response": "", "yes": 0, "total":0},
//       {"index": 9, "question": "Can you readily believe in yourself without constant affirmation from people?", "response": "", "yes": 0, "total":0},
//       {"index": 10, "question": "Do you have long-term goals detached from materials?", "response": "", "yes": 0, "total":0},
//       {"index": 11, "question": "Do you feel loved?", "response": "", "yes": 0, "total":0},
//     {"index": 12, "question": "Do you understand love?", "response": "", "yes": 0, "total":0},
//     {"index": 13, "question": "Do you give love?", "response": "", "yes": 0, "total":0},
//     {"index": 14, "question": "Do you have a personal definition of love?", "response": "", "yes": 0, "total":0},
//     {"index": 15, "question": "Have you fallen out of love with someone because your definitions of love differed?", "response": "", "yes": 0, "total":0},
//     {"index": 16, "question": "Do you believe that there are irredeemable people?", "response": "", "yes": 0, "total":0},
//     {"index": 17, "question": "Do you believe that a human life is invaluable?", "response": "", "yes": 0, "total":0},
//     {"index": 18, "question": "Do you believe that a human life is irreplaceable?", "response": "", "yes": 0, "total":0},
//     {"index": 19, "question": "Do you truly believe that you've lost the opportunity to experience something in life?", "response": "", "yes": 0, "total":0},
//     {"index": 20, "question": "Did you have a good childhood?", "response": "", "yes": 0, "total":0},
//     {"index": 21, "question": "Do you still have your sense of wonder?", "response": "", "yes": 0, "total":0},
//     {"index": 22, "question": "Have you shown compassion today?", "response": "", "yes": 0, "total":0},
//     {"index": 23, "question": "Do you need other people to feel real?", "response": "", "yes": 0, "total":0},
//     {"index": 24, "question": "Do the small things still bring you joy?", "response": "", "yes": 0, "total":0},
//     {"index": 25, "question": "Is there a place you can truly call home?", "response": "", "yes": 0, "total":0},
//     {"index": 26, "question": "Can you let go of responsibility when you need to?", "response": "", "yes": 0, "total":0},
//     {"index": 27, "question": "Are you doing it because you want to, not just because it's expected?", "response": "", "yes": 0, "total":0},
//     {"index": 28, "question": "Do you live in truth to the fact that the people who love you want you to be happy?", "response": "", "yes": 0, "total":0},
//     {"index": 29, "question": "Do you love this world, amidst all the difficulty?", "response": "", "yes": 0, "total":0},
//     {"index": 30, "question": "Can you still give it another chance?", "response": "", "yes": 0, "total":0},
//     {"index": 31, "question": "Have you learned to live with your loneliness yet?", "response": "", "yes": 0, "total":0},
//     {"index": 32, "question": "Do you have a name that others can call you by that doesn't sting?", "response": "", "yes": 0, "total":0},
//     {"index": 33, "question": "Should the grief take you today?", "response": "", "yes": 0, "total":0},
//     {"index": 34, "question": "Is tenderness a form of strength?", "response": "", "yes": 0, "total":0},
//     {"index": 35, "question": "Are you aware of the history that you're making?", "response": "", "yes": 0, "total":0},
//     {"index": 36, "question": "Do you forget people easily?", "response": "", "yes": 0, "total":0},
//     {"index": 37, "question": "Have you accepted that the world is not a binary? That one decision is not the end of the world – it only will be if you let it take over your mind?", "response": "", "yes": 0, "total":0},
//     {"index": 38, "question": "Do you truly know that you were not in the wrong during that moment?", "response": "", "yes": 0, "total":0},
//     {"index": 39, "question": "Can you be vulnerable without aestheticizing or romanticing it?", "response": "", "yes": 0, "total":0},
//     {"index": 40, "question": "Do you (actually) care about what other people think?", "response": "", "yes": 0, "total":0},
//     {"index": 41, "question": "Do you know how to talk about your day?", "response": "", "yes": 0, "total":0},
//     {"index": 42, "question": "Is there someone who can be witness to your life right now?", "response": "", "yes": 0, "total":0},
//     {"index": 43, "question": "Do you hold the love that you feel you need to live?", "response": "", "yes": 0, "total":0},
//     {"index": 44, "question": "When you wake up, are there still people who flutter into your head that just might be thinking about you too?", "response": "", "yes": 0, "total":0},
//     {"index": 45, "question": "Do you know that if you want to be loved, you must let the love in?", "response": "", "yes": 0, "total":0},
//     {"index": 46, "question": "Do you feel like if someone gave you the world, you could accept it? ", "response": "", "yes": 0, "total":0},
//     {"index": 47, "question": "Do you know what's important to you right now?", "response": "", "yes": 0, "total":0},
//     {"index": 48, "question": "Do you have something or someone you could die for?", "response": "", "yes": 0, "total":0},
//     {"index": 49, "question": "Do you feel like you need to die for something or someone, one day? ", "response": "", "yes": 0, "total":0},
//     {"index": 50, "question": "Can you challenge yourself to not let the grief consume you today?", "response": "", "yes": 0, "total":0},
//     {"index": 51, "question": "Are you sure about what you want?", "response": "", "yes": 0, "total":0},
//     {"index": 52, "question": "Think about the last time you died. Do you know what to do to not make the same mistake?", "response": "", "yes": 0, "total":0},
//     {"index": 53, "question": "Are you done mourning for all the past selves you've lost?", "response": "", "yes": 0, "total":0},
//     {"index": 54, "question": "Do you know the boundaries of where love can push you towards?", "response": "", "yes": 0, "total":0},
//     {"index": 55, "question": "Is that all the love you have left to give?", "response": "", "yes": 0, "total":0},
//     {"index": 56, "question": "Are there things you love out of pleasure, not out of expectation?", "response": "", "yes": 0, "total":0},
//     {"index": 57, "question": "Are you done dissecting memories that are doing more harm than good to your head?", "response": "", "yes": 0, "total":0},
//     {"index": 58, "question": "Are you still desperate to be needed?", "response": "", "yes": 0, "total":0},
//     {"index": 59, "question": "Can you let the desperation drive you instead of kill you?", "response": "", "yes": 0, "total":0},
//     {"index": 60, "question": "Do you like where you're heading?", "response": "", "yes": 0, "total":0},
//     {"index": 61, "question": "Are you able to accept that 'importance' and 'significance' can be dictated by you at this very moment?", "response": "", "yes": 0, "total":0},
//     {"index": 62, "question": "Are you aware of how you hold the universe in your hands – how you see it, touch it, and feel?", "response": "", "yes": 0, "total":0},
//     {"index": 63, "question": "Should everyone be a natural object of love?", "response": "", "yes": 0, "total":0},
//     {"index": 64, "question": "When someone dies, do you know that you can still uncover the part of yourself that they've nurtured in you? That you don't have to bury it with them, and that they would most likely love to see it alive, too?", "response": "", "yes": 0, "total":0},
//     {"index": 65, "question": "Do you need someone who knows little about you to sharpen your self-image, or can you look at your own palms and face in the mirror and do it for yourself?", "response": "", "yes": 0, "total":0},
//     {"index": 66, "question": "Have you thought about what the world is going to look like when you die? Not in relation to your funeral/burial – but a glance at what the world coming after is harboring.", "response": "", "yes": 0, "total":0},
//     {"index": 67, "question": "Do you know that life gets better when what you hold dear and love is no longer kept secret?", "response": "", "yes": 0, "total":0},
//     {"index": 68, "question": "Can you handle loving more than one person at once, romantically?", "response": "", "yes": 0, "total":0},
//     {"index": 69, "question": "Do you feel like you can give your body and not feel a thing?", "response": "", "yes": 0, "total":0},
//     {"index": 70, "question": "Have you defined your self-preservation practice yet?", "response": "", "yes": 0, "total":0},
//     {"index": 71, "question": "Can you introduce yourself without titles that other people have come up for you?", "response": "", "yes": 0, "total":0},
//     {"index": 72, "question": "Are you ready to accept that nobody really thinks about you, at all?", "response": "", "yes": 0, "total":0},
//     {"index": 73, "question": "Should some people only stay in our memory?", "response": "", "yes": 0, "total":0},
//     {"index": 74, "question": "Can love be a temporary thing?", "response": "", "yes": 0, "total":0},
//     {"index": 75, "question": "Have you watched the world burn lately?", "response": "", "yes": 0, "total":0},
//     {"index": 76, "question": "Can you attend to what is urgent?", "response": "", "yes": 0, "total":0},
//     {"index": 77, "question": "Do you know that all the performances of yourself still mirror the truest you?", "response": "", "yes": 0, "total":0},
//     {"index": 78, "question": "We are always in the middle of the world. Do you feel that the story is far from over, too?", "response": "", "yes": 0, "total":0},
//     {"index": 79, "question": "Do you know when to be tolerant versus when to be sincere?", "response": "", "yes": 0, "total":0},
//     {"index": 80, "question": "Do you have a plan of action when dealing with loss?", "response": "", "yes": 0, "total":0},
//     {"index": 81, "question": "Can you love something that you resent?", "response": "", "yes": 0, "total":0},
//     {"index": 82, "question": "Are you eager to share all that you are, all your love, all your longings, all your being out into the world?", "response": "", "yes": 0, "total":0},
//     {"index": 84, "question": "Do you know that I see no future if not with you?", "response": "", "yes": 0, "total":0},
//     {"index": 85, "question": "Do you believe that because nothing matters, everything does?", "response": "", "yes": 0, "total":0},
//     {"index": 85, "question": "Have you looked around and basked in the miracle of being lately?", "response": "", "yes": 0, "total":0},
//     {"index": 86, "question": "Is abundance and collectivism your first reaction, or are you still tied down by the fear of scarcity?", "response": "", "yes": 0, "total":0},
//     {"index": 87, "question": "Do you have someone who loves you now, who never seems to have to take you away?", "response": "", "yes": 0, "total":0},
//     {"index": 88, "question": "Are you okay with the fact that nothing is certain?", "response": "", "yes": 0, "total":0},
//     {"index": 89, "question": "Are you okay with the fact that we are all just trying to control a primordial chaos, and that consistency is a far dream?", "response": "", "yes": 0, "total":0},
//     {"index": 90, "question": "Do you know how to tell the story of the best thing that has ever happened to you?", "response": "", "yes": 0, "total":0},
//     {"index": 91, "question": "When you feel a pang of desire, do you know how to feed it healthily?", "response": "", "yes": 0, "total":0},
//     {"index": 92, "question": "Have you made living worthwhile today?", "response": "", "yes": 0, "total":0},
//     {"index": 93, "question": "Is all this longing natural?", "response": "", "yes": 0, "total":0},
//     {"index": 94, "question": "If you desire reciprocity, do you think you're in the right space for it?", "response": "", "yes": 0, "total":0},
//     {"index": 95, "question": "Are you actually capable of maintaining a healthy relationship with your friends right now, let alone a lover?", "response": "", "yes": 0, "total":0},
//     {"index": 96, "question": "If people always leave you, do you think that you're a fleeting & temporary person? Must your stay reflect the relationships too, or can it resist it?", "response": "", "yes": 0, "total":0},
//     {"index": 97, "question": "Do you find yourself unnecessarily signaling your needs for help and desire to be seen in a way that no one knows how to answer?", "response": "", "yes": 0, "total":0},
//     {"index": 99, "question": "Are your feelings real or have you discarded them as mere projections?", "response": "", "yes": 0, "total":0},
//     {"index": 100, "question": "By improving yourself, can you improve the lives of others? What if it's centered on you?", "response": "", "yes": 0, "total":0},
//     {"index": 101, "question": "Do you still want to go on?", "response": "", "yes": 0, "total":0},
//     {"index": 102, "question": "Can you go on?", "response": "", "yes": 0, "total":0},
//     {"index": 103, "question": "Can you accept that you need people, and that sometimes they won't need you back?", "response": "", "yes": 0, "total":0},
//     {"index": 104, "question": "Are you giving your own self love in the form of presence?", "response": "", "yes": 0, "total":0},
//     {"index": 105, "question": "Do you trust the world when you're asleep?", "response": "", "yes": 0, "total":0},
//     {"index": 106, "question": "Is the mundane sacred?", "response": "", "yes": 0, "total":0},
//     {"index": 107, "question": "Are you comfortable with forgetting? Do you know what needs to be forgotten?", "response": "", "yes": 0, "total":0},
//     {"index": 108, "question": "If you forget parts of yourself, do you know how you're going to find it in you again?", "response": "", "yes": 0, "total":0},
//     {"index": 109, "question": "Do you hold your body and treat it as the anchor it is?", "response": "", "yes": 0, "total":0},
//     {"index": 110, "question": "Is it alright to keep thinking about all the love you've lost?", "response": "", "yes": 0, "total":0},
//     {"index": 111, "question": "Is your fear of loneliness just about you? Is it not because you are afraid you have so much love to give that will never see the light?", "response": "", "yes": 0, "total":0},
//     {"index": 112, "question": "Do you say you feel nothing at all when you're feeling too much?", "response": "", "yes": 0, "total":0},
//     {"index": 113, "question": "Is it easy for you to reclaim what has been taken from you?", "response": "", "yes": 0, "total":0},
//     {"index": 113, "question": "Are there any emotions within you that might be overstaying?", "response": "", "yes": 0, "total":0}
//   ];
  
//   rituals.forEach(function(item){
//     db.get('votes')
//       .push({ index:item.index, question: item.question, response: item.response, yes: item.yes, total: item.total })
//       .write()
//   });
  
//   console.log("Questions added");
//   console.log(db.get('votes').value());
//   response.redirect("/");
// });

// // removes all entries from the collection
// app.get("/clear", function (request, response) {
//   // removes all entries from the collection
//   db.get('votes')
//   .remove()
//   .write()
//   console.log("Database cleared");
//   response.redirect("/");
// });


// send in a vote
app.post("/speak", function (request, response) {
  
  console.log("submitted a vote");
  
  let updated = {
    "response": request.query.response,
    "yes": parseInt(request.query.yes),
    "total": parseInt(request.query.total)
  }
      console.log(db.get('votes').value());

  db.get('votes')
    .find({ index: parseInt(request.query.index) })
    .assign( updated )
    .write();
  
  response.sendStatus(200);

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

