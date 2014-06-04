var app = app || {};

var TO_CHECK = ["firstName", "lastName", "phone", "email", "title", "company", "city"];
var ENTER_KEY = 13;
$(function() {
  var alphabet = ['all','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  for(var i=0; i< alphabet.length; i++){
    var tab = document.createElement('article');
    tab.dataset.name="letter-tab";
    tab.className ="letter padding-tb-1 info tab disp-ib w-small";
    if(i === 0){
      tab.className += " all-letters highlight";
    }
    tab.innerHTML = alphabet[i].toUpperCase();
    $('.letters').append(tab);
  }

  new app.RolodexView();
});