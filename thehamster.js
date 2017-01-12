// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2jls5PUkwSdmkZeKzmsSSR_SzXcwZ-N0",
  authDomain: "fir-auth-dc3df.firebaseapp.com",
  databaseURL: "https://fir-auth-dc3df.firebaseio.com",
  storageBucket: "fir-auth-dc3df.appspot.com",
  messagingSenderId: "1068267719983"
};
firebase.initializeApp(config);


setTimeout(()=>console.log(firebase.auth().currentUser), 1000)





//firebase.auth().onAuthStateChanged is an event listener
//  that checks on the user authorization state changed


firebase.auth().onAuthStateChanged(()=> {
  if (firebase.auth().currentUser !== null) {
    var email = firebase.auth().currentUser.email
    $(".mainpage h1").append(`${email}`);
    $(".loginpage").addClass("ninja");
    $(".mainpage").removeClass("ninja");
  }else {
    $(".mainpage").addClass("ninja");
    $(".loginpage").removeClass("ninja");
  }
})


$("form").submit(function (e) {
  var email = $('input[type="email"]').val();
  var pass = $('input[type="password"]').val();

  firebase.auth().signInWithEmailAndPassword(email, pass).then(()=> {
    $('input[type="email"]').val(``);
    $('input[type="password"]').val(``);


    // Or you can grab the form and do $("form")[0].reset() to set values to zero


    // $(".mainpage h1").append(`${email}`);
    // $(".loginpage").addClass("ninja");
    // $(".mainpage").removeClass("ninja");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    var fullError = `${errorCode}: ${errorMessage}`
    alert(fullError)
  });

  e.preventDefault();

});


$("#register").click((e)=> {
  var email = $('input[type="email"]').val();
  var pass = $('input[type="password"]').val();

  firebase.auth().createUserWithEmailAndPassword(email, pass).then(()=> {
    $('input[type="email"]').val(``);
    $('input[type="password"]').val(``);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    var fullError = `${errorCode}: ${errorMessage}`
    alert(fullError)
  });
  e.preventDefault();

});
//
$("#signOut").click((e) => {
  firebase.auth().signOut().then(()=> {
    console.log(firebase.auth().currentUser);

//     // $('input[type="password"]').val() = "";
    $(".mainpage h1").text(`Good Morning, `);
//     $(".mainpage").addClass("ninja");
//     $(".loginpage").removeClass("ninja");
  })
})
// could also be opened with => like
// $("form").submit(() => {})
