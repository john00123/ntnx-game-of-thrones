$('.container').on("click",'p.link',function(){
  $('this').text('change')
  // characterList()
  // usersSorted.get().then((query) => {
  //
  //   query.forEach((doc) => {
  //     let responses = doc.data().Responses
  //
  //     if(doc.data().Name == 'Viraj'){
  //       for(i= 0; i< responses.length; i++){
  //
  //         if(responses[i] === 1){
  //           $('p').eq(i).append(` you choose Alive`)
  //           responses[i] === masterResponses[i] ?
  //           $('p').eq(i).addClass('correct') : $('p').eq(i).addClass('incorrect')
  //         }
  //
  //         if(responses[i] === 2){
  //           $('p').eq(i).append(` you choose Dead`)
  //           responses[i] === masterResponses[i] ?
  //           $('p').eq(i).addClass('correct') : $('p').eq(i).addClass('incorrect')
  //         }
  //
  //         if(responses[i] === 3){
  //           $('p').eq(i).append(` you choose Wight Walker`)
  //           responses[i] === masterResponses[i] ?
  //           $('p').eq(i).addClass('correct') : $('p').eq(i).addClass('incorrect')
  //         }
  //
  //
  //         }
  //       }
  //
  //   })
  // })

})
