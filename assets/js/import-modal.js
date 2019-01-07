const links = document.querySelectorAll('link[rel="modal"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.modal-template')
  let clone = document.importNode(template.content, true)
  // if (link.href.match('about.html')) {
  //   document.querySelector('body').appendChild(clone)
  // } else {
    document.querySelector('.wrapper-modal').appendChild(clone)
  // }
})