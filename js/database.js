// Initialize Cloud Firestore through Firebase
let db = firebase.firestore();
let characters = db.collection("characters").orderBy("ID", "asc")
let usersSorted = db.collection("users").orderBy("Score", "desc")
let users = db.collection("users")
let masterResponses= []
let c = $('.container')




function characterList(){
  c.html('<h1>Game of Thrones Pool</h1><br>')

  characters.get().then((query) => {

    query.forEach((doc) => {
      let state = doc.data().State
      let name = doc.data().Name
      let pregnant = doc.data().Pregnant
      let kills = doc.data().Kills
      let iron = doc.data().Iron


      if(state === 1){ c.append(`<p class="alive">${name} is <span>Alive</span></p>`)}
      if(state === 2){ c.append(`<p class="dead"> ${name} is <span>Dead</span></p>`)}
      if(state === 3){ c.append(`<p class="ww">${name}  is a <span>Wight Walker</span></p>`)}



      masterResponses.push(state)

    })
    //

  })
  c.fadeIn('fast')
}

function singlePage(text){
  let userName = text
  characterList()

  $('a').eq(0).hide();
  $('a').eq(1).text('‹ Back')
  usersSorted.get().then((query) => {
    query.forEach((doc) => {
      let responses = doc.data().Responses
      let pregnant = doc.data().Pregnant
      let kills = doc.data().Kills
      let iron = doc.data().Iron

      if(doc.data().Name == userName){
        $('h1').after(`<h3>${doc.data().Score} points </h3>`)
        for(i= 0; i< responses.length; i++){


          if(responses[i] === 0){
            $('p').eq(i).append(` u chose nothing`)
          }

          if(responses[i] === 1){
            $('p').eq(i).append(` u chose Alive`)
            responses[i] === masterResponses[i] ?
            $('p').eq(i).addClass('correct') : $('p').eq(i).addClass('incorrect')
          }

          if(responses[i] === 2){
            $('p').eq(i).append(` u chose Dead`)
            responses[i] === masterResponses[i] ?
            $('p').eq(i).addClass('correct') : $('p').eq(i).addClass('incorrect')
          }

          if(responses[i] === 3){
            $('p').eq(i).append(` u chose W-Walker`)
            responses[i] === masterResponses[i] ?
            $('p').eq(i).addClass('correct') : $('p').eq(i).addClass('incorrect')
          }
          }

          if(pregnant === 0){ c.append(`<br><br><p class="correct">Bonus - You chose Daenerys is not pregnant <code>&nbsp;+1 point</code></p>`)}
          else{ c.append(`<br><br><p class="incorrect">Bonus - You chose Daenerys is  pregnant</p>`)}

          if(kills === 3){ c.append(`<p class="correct">Bonus - You chose Arya kills the Knight King <code>&nbsp;+2 points</code></p>`)}
          else{ c.append(`<p class="incorrect">Bonus - You did not choose Arya as the Knight King's executioner</p>`)}

          if(iron === 0){ c.append(`<p class="correct">Bonus - You chose no one sats in the Iron throne <code>&nbsp;+4 points</code></p>`)}
          else{ c.append(`<p class="incorrect">Bonus - You chose someone is sitting in the Iron Throne</p>`)}
        }

    })
  })
}

function leaderboard(){
  c.html('<h1>Leaderboard</h1><br>')

  usersSorted.get().then((query) => {

    query.forEach((doc) => {

      let bet = doc.data().Money
      let name = doc.data().Name
      let dbScore = doc.data().Score


      c.append(`<p class='link'><kbd>${name}</kbd> &nbsp; has <span>${dbScore} points</span>${bet === 1? ' and is betting' :''}</p>`)

    })
    $('.link').click(function(){
      let text = $(this).find('kbd').text()
      singlePage(text)
      $('h1').text(text)
    })

  })

  c.fadeIn('fast')
}

function bonus() {
  c.append('<p class="">Bonus - Daenerys was not pregnant</p>');
  c.append('<p class="">Bonus - Arya kills the Knight King </p>');
  c.append('<p class="">Bonus - The Iron throne no longer exists</p><br><br>');
}


$('.characters').click(function(){
  $('a').removeClass('selected')
  $('.characters').addClass('selected')
  c.fadeOut()
  setTimeout(function () {
    characterList()
    bonus()
  }, 350);
})

$('.leader-board').click(function(){
  $('a').removeClass('selected')
  $('.leader-board').addClass('selected')
  $('a').eq(0).show();
  $('a').eq(1).text('Leaderboard')

  c.fadeOut()
  setTimeout(function () {
    leaderboard()

  }, 350);
})






$(document).ready(function () {
  characterList()
  bonus()
})
