var app = app || {};
var TO_CHECK = ["firstName", "lastName", "phone", "email", "title", "company", "city"];
var ENTER_KEY = 13;
$(function() {
  var alphabet = ['all','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  for(var i=0; i< alphabet.length; i++){
    var tab = document.createElement('article');
    tab.className ="letter";
    if(i === 0){
      tab.className = "letter all-letters active-letter";
    }
    tab.innerHTML = alphabet[i].toUpperCase();
    $('.letters').append(tab);
  }

  new app.RolodexView();
});