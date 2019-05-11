let db = firebase.firestore();
let characters = db.collection("characters").orderBy("ID", "asc")



function characterList(){

  characters.get().then((query) => {

    query.forEach((doc) => {

      let state = doc.data().State
      let name = doc.data().Name

      $('body').append(`<div vc class='character'>
        <h1>${name.match(/[A-Z]/g).join('')}</h1>
        <label class="switch">
          <input class='red-button' value='${name}'type="checkbox" ${state === 1 ? 'checked': ''}>
          <span class="slider round"></span>
        </label>
        <p>${name}</p></div>`);


  });

  $('.red-button:checkbox').change(function() {
  // this will contain a reference to the checkbox


    let name2 = $(this).val()

    if (this.checked) {
      db.collection("characters").doc(name2).update({State:1})
    } else {
      db.collection("characters").doc(name2).update({State:2})
    }
    })
    //
  })
}

characterList()
