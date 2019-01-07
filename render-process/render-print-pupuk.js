const ipc = require('electron').ipcRenderer
const BrowserWindow = require('electron').remote.BrowserWindow

$(document).ready(function() {

  var tbPupukPrint = $('#tb-pupuk-print tbody')

  ipc.on('data-table-pupuk', function (event, data) {
    //console.log('from print window', data)
    data.map((pupuk, index) => {
      //console.log(pupuk[1])
      tbPupukPrint.append(
        `<tr>`+
          `<td>${index+1}</td>`+
          `<td>${pupuk[1]}</td>`+
          `<td>${pupuk[2]}</td>`+
          `<td>${pupuk[3]}</td>`+
          `<td>${pupuk[4]}</td>`+
        `</tr>`
      )
    })
  })

})