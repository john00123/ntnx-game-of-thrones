let db = firebase.firestore();
let characters = db.collection("characters").orderBy("ID", "asc")


function characterList(){

  characters.get().then((query) => {

    query.forEach((doc) => {
      console.log(doc.data())
      let state = doc.data().State
      let name = doc.data().Name
      if(state ===1){
        $('body').append(`<div vc class='character'>
        <h1>${name[0]}</h1>
        <p>${name}</p></div>`)
      }
    })
    //
  })
}

characterList()
