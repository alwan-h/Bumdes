const links = document.querySelectorAll('link[rel="import"]')

// Import and add each page to the DOM
Array.prototype.forEach.call(links, (link) => {
  let template = link.import.querySelector('.task-template')
  let clone = document.importNode(template.content, true)
  // if (link.href.match('about.html')) {
  //   document.querySelector('body').appendChild(clone)
  // } else {
    document.querySelector('.content').appendChild(clone)
  // }
})


$(document).ready(function() {
  $('#modal_pupuk_edit').load('./modal/modal_pupuk_edit.html')
  $('#modal_gudang').load('./modal/modal_gudang.html')
  $('#modal_pengguna').load('./modal/modal_pengguna.html')
  $('#modal_air_edit').load('./modal/modal_edit_air.html')
  $('#modal_nota').load('./modal/modal_nota_pembelian.html')
})