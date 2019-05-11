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


      if(state === 1){ c.append(`<p class="alive">${name} is <span>Alive</span></p>`)}
      if(state === 2){ c.append(`<p class="dead"> ${name} is <span>Dead</span></p>`)}
      if(state === 3){ c.append(`<p class="ww">${name}  is a <span>Wight Walker</span></p>`)}

      masterResponses.push(state)
    })
    //
  })
}

function singlePage(text){
  let userName = text
  characterList()

  $('a').eq(0).hide();
  $('a').eq(1).text('‹ Back')
  usersSorted.get().then((query) => {
    query.forEach((doc) => {
      let responses = doc.data().Responses

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
        }

    })
  })

}

function leaderboard(){
  $('a').eq(0).show();
  $('a').eq(1).text('Leaderboard')
  c.html('<h1>Leaderboard</h1><br>')
  usersSorted.get().then((query) => {

    query.forEach((doc) => {
      let score = 0
      let bet = doc.data().Money
      let name = doc.data().Name
      let dbScore = doc.data().Score
      let response = doc.data().Responses
      let pregnant = doc.data().Pregnant
      let kills = doc.data().Kills
      let iron = doc.data().Iron

      for (i=0; i< masterResponses.length; i++){

        if(response[i] === masterResponses[i]){
           response[i] === 3 ? score+= 2 : score+=1
        }

        if(response[i] !== masterResponses[i]){
           response[i] === 3 ? score+=0 : score+= 0
        }
      }

      //bonus
      pregnant === null ? score+=1 : 0
      kills === 3 ? score+=2 : 0
      iron === null ? score +=4 : 0

      users.doc(name).update({Score:score})


      c.append(`<p class='link'><kbd>${name}</kbd> &nbsp; has <span>${dbScore} points</span>${bet === 1? ' and is betting' :''}</p>`)

    })
    $('.link').click(function(){
      let text = $(this).find('kbd').text()
      singlePage(text)
      $('h1').text(text)
    })

  })
}




$('.characters').click(characterList)
$('.leader-board').click(leaderboard)






$(document).ready(characterList)