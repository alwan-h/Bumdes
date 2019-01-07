const remote = require('electron').remote

var buttonNav = $('.nav-button')

buttonNav.click(function() {
  // console.log($(this).attr('data-section'))
  handleSectionTrigger($(this))
}) 

function handleSectionTrigger(element) {
  hideAllSectionsAndDeselectButtons()
  element.parent().addClass('active')
  const sectionId = element.attr('data-section')
  // console.log(sectionId)
  $('#'+sectionId+'-section').addClass('is-shown')
}

function hideAllSectionsAndDeselectButtons() {
  $('.js-section').removeClass('is-shown')
  $('.li-button').removeClass('active')
}
 

$('#logout').click(function() {
  window.location.href= 'index.html'
})