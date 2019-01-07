const ipc = require('electron').ipcRenderer
const BrowserWindow = require('electron').remote.BrowserWindow

$(document).ready(function() {

  var tbPupukPrint = $('#print-penjualan-pupuk tbody')

  ipc.on('data-penjualan-pupuk', function (event, data) {
    console.log('from print window', data)
    data.map((pupuk, index) => {
      //console.log(pupuk[1])
      tbPupukPrint.append(
        `<tr>`+
          `<td>${index+1}</td>`+
          `<td>${pupuk[1]}</td>`+
          `<td>${pupuk[2]}</td>`+
          `<td>${pupuk[3]}</td>`+
          `<td>${pupuk[4]}</td>`+
          `<td>${pupuk[5]}</td>`+
          `<td>${pupuk[6]}</td>`+
          `<td>${pupuk[7]}</td>`+
          `<td>${pupuk[8]}</td>`+
        `</tr>`
      )
    })
  })

})