let db = firebase.firestore();
let characters = db.collection("characters").orderBy("ID", "asc")
let c = db.collection("characters")
let usersSorted = db.collection("users").orderBy("Score", "desc")
let users = db.collection("users")
let masterResponses= []


function characterList(){

  characters.get().then((query) => {

    query.forEach((doc) => {

      let state = doc.data().State
      let name = doc.data().Name


      $('body').append(`<div vc class='character'>
        <h1>${name.match(/[A-Z]/g).join('')}</h1>

        <label class="switch">
          <input class='red-button' value='${name}'type="checkbox"
          ${state === 1 ? 'checked': ''}>
          <span class="slider round"></span>
        </label>

        <p>${name}</p></div>`
      )

      masterResponses.push(state)
    });

    $('.red-button:checkbox').change(function() {
      let name2 = $(this).val()

      if(this.checked){
        c.doc(name2).update({State:1})
        scoreUpdate()
      } else{
        c.doc(name2).update({State:2})
        scoreUpdate()

      }
    })

  })
}

function scoreUpdate(){

  characters.get().then((query) => {
    masterResponses = []
    query.forEach((doc) => {
      let state = doc.data().State
      masterResponses.push(state)
    });
  })

  users.get().then((query) => {
    query.forEach((doc) => {

      let score = 0
      let bet = doc.data().Money
      let name = doc.data().Name
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
      pregnant === null ? score +=1 : 0
      kills    ===    3 ? score +=2 : 0
      iron     === null ? score +=4 : 0

      users.doc(name).update({Score:score})
    })
  })
}

characterList()
