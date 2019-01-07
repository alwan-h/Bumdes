const {ipcRenderer} = require('electron')
const renderPanel = require('../utils/render-panel-beranda.js')
const renderChart = require('../utils/render-chart.js')
var penjualan = require('../utils/penjualan.js')

$(document).ready(function() {

  // ipcRenderer.send('data-total-penjualan')
  // ipcRenderer.on('total-penjualan', (event, arg) => {
  //   // console.log('penjualan pupuk', arg[0].total_penjualan)
  //   var penjualanPupuk = $('#penjualanPupuk')
  //   var penjualanAir = $('#penjualanAir')

  //   penjualanPupuk.text(arg[0].total_penjualan)
  //   penjualanPupuk.append('<span> Kg</span>')
    
  //   penjualanAir.text(arg[1].total_penjualan)
  //   penjualanAir.append('<span> Galon</span>')
  // })

  // ipcRenderer.send('data-total-pembelian')
  // ipcRenderer.on('total-pembelian', (event, arg) => {
  //   // console.log('pembelian', arg[0].total_pembelian)
  //   var pembelianPupuk = $('#pembelianPupuk')

  //   pembelianPupuk.text(arg[0].total_pembelian)
  //   pembelianPupuk.append('<span> Kg</span>')
  // })

  var date = new Date()


  $('.grafikTahun').text(date.getFullYear())

  renderPanel.renderPanelPembelian()
  renderPanel.renderPanelPenjualan()
  renderPanel.renderPanelStock()
  renderPanel.renderPanelPiutang()

  renderChart.renderPupukChart()
  renderChart.renderAirChart()
  renderChart.renderTransaksiChart()
  
  renderChart.setGrafikPupuk()
  renderChart.setGrafikAir()
  renderChart.setGrafikTransaksi()
})

