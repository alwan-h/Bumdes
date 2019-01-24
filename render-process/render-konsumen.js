const konsumen = require('../utils/new-konsumen')
const tbKonsumen = require('../utils/render-tb-konsumen')

$(document).ready(function() {
  let nik = $('#nik-konsumen')
  let nama = $('#nama')
  let kelompokTani = $('#kelompok-tani')
  let namaDesa = $('#nama-desa')
  let luasLahan = $('#luas-lahan')
  let btnSimpanKonsumen = $('#simpan-konsumen')

  tbKonsumen.renderTbKonsumen()

  btnSimpanKonsumen.click(function() {
    let dataKonsumen = [
      nik.val(),
      nama.val(),
      kelompokTani.val(),
      namaDesa.val(),
      luasLahan.val(),
      (parseFloat(luasLahan.val()) * 100) * 2,
      0,
      (parseFloat(luasLahan.val()) * 100) * 3,
      0,
      (parseFloat(luasLahan.val()) * 100) * 5
    ]

    konsumen.insertKonsumen(dataKonsumen).then(data => {
      if (data) {
        tbKonsumen.renderTbKonsumen()
        clearValue()
      }
    }) 
  })


  function clearValue() {
    nik.val('')
    nama.val('')
    kelompokTani.val('')
    namaDesa.val('')
    luasLahan.val('')
  }
})