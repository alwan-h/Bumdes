const remote = require('electron').remote
const main = remote.require('./main.js')

// $('#login_form').validator()

var loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', function(e) {
  console.log('oke')
  e.preventDefault()

  var $btn = $(this).button('loading')

  var userLevel = $('#user_level').val()
  var userPassword = $('#user_password').val()

  console.log(!userPassword);

  if (userPassword.length !== 0) {
    
    $.get(main.getBaseUrl()+'api/user', {level : userLevel, password : userPassword})
      .done(function(data) {
        console.log(data);
        $btn.button('reset')
        if (data.length == 1) {
          main.setUserLevel(data[0].user_level)
          var window = remote.getCurrentWindow()
          main.openWindow()
          window.close()
        }
        else {

        }
      })
      .fail(function() {
        $btn.button('reset')
      })

  }
  else {
    $btn.button('reset')
  }
}, false)