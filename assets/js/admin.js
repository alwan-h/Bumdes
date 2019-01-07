const remote = require('electron').remote
const main = remote.require('./main.js')

console.log('user level', main.getUserLevel())

document.title = main.getUserLevel()

$('#user_level').text(main.getUserLevel())

var loginButton = document.getElementById('logout')

loginButton.addEventListener('click', function(e) {
  console.log('oke')
  e.preventDefault()
  var window = remote.getCurrentWindow()
  main.loginWindow()
  window.close()
}, false)


