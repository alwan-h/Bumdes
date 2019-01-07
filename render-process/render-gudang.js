const {ipcRenderer} = require('electron')
const { BrowserWindow } = require('electron').remote
const path = require('path')
const pembelian = require('../utils/pembelian.js')
const renderPanel = require('../utils/render-panel-beranda.js')
const gudang = require('../utils/render-tb-gudang.js')
const renderPupuk = require('../utils/render-tb-pupuk')
//const PDFWindow = require('electron-pdf-window')

$(document).ready(function() {

  let jenisPupuk = $('#jenisPupuk')
  let jumlahPupuk = $('#jumlahBarang')
  let hargaBeliPupuk = $('#hargaBeliBarang')
  let totalHargaBeliPupuk = $('#totalHargaBeli')
  let simpanBeliBarang = $('#simpanBeliBarang')
  let tablePupukGudang = $('#table-pupuk-gudang tbody')
  let tableJenisPupuk = $('#table-jenis-pupuk tbody')
  let dataPupuk
  

  let tablePupuk = $('#table-pupuk-gudang')

  // let today = () => {
  //   let date = new Date()
  //   let day = date.getDate()
  //   let month = date.getMonth() + 1
  //   let year = date.getFullYear()
  //   return day+'-'+month+'-'+year
  // }

  function today(addDay) {
    var date = new Date(); // Now
    date.setDate(date.getDate() + addDay); // Set now + 30 days as the new date
    //console.log(date.toISOString().slice(0, 10));
    return date.toISOString().slice(0, 10)
  }

  //console.log(today())

  // renderTableJenisPupuk()
  renderJenisPupuk()
  //getListBarang()
  //getPembelian()

  //renderPupuk.renderTbPupuk()
  renderPupuk.renderTbPembelian()

  gudang.renderTbGudang()

  jumlahPupuk.keyup(function() {
    kalkulasiTotalHarga()
  })

  hargaBeliPupuk.keyup(function() {
    kalkulasiTotalHarga()
  })

  simpanBeliBarang.click(function(e) {
    e.preventDefault()
    //console.log('simpan barang')
    //insertListPupuk()
    //insertPembelian()
    let dataPembelian = [
      jenisPupuk.val(),
      1,
      'Kg',
      jumlahPupuk.val(),
      hargaBeliPupuk.val(),
      totalHargaBeliPupuk.text(),
      today(0)
    ]

    let wrapData = {
      data: dataPembelian,
      param: 'pembelian'
    }

    pembelian.insertPembelian(wrapData).then((data) => {
      if (data) {
        renderPanel.renderPanelPembelian()  
        gudang.renderTbGudang()
        renderPupuk.renderTbPupuk()
        renderPupuk.renderTbPembelian()
        clearInput()
      }
    })
  })

  function clearInput() {
    jumlahPupuk.val('')
    hargaBeliPupuk.val('')
    totalHargaBeliPupuk.text('')
  }

  function renderJenisPupuk() {
    var param = {category: 'Pupuk'} 
    ipcRenderer.send('get-barang', param)
    ipcRenderer.on('data-barang', (event, arg) => {
      tableJenisPupuk.empty()
      jenisPupuk.empty()
      jenisPupuk.append('<option value="">Pilih Jenis Pupuk</option>')
      //console.log(arg)
      arg.map((jenis, index) => {
        if (jenis.barang_category == 1) { 
          jenisPupuk.append(
            '<option value="'+jenis.barang_id+'">'+jenis.barang_nama+'</option>'
          )
          tableJenisPupuk.append(
            `<tr>`+
              `<td>${index+1}</td>`+
              `<td>${jenis.barang_nama}</td>`+
              // `<td><button class="btn btn-default btn-xs">Edit</button></td>`+
            `</tr>`
          )
        }
      })
    })
  }

  function kalkulasiTotalHarga() {
    let totalHarga = jumlahPupuk.val() * hargaBeliPupuk.val()
    totalHargaBeliPupuk.text(totalHarga)
  }

})