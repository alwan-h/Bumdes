var penjualan = require('../utils/penjualan.js')

$(document).ready(function() {

  let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  var dataPupuk = []
  var dataAir = []

  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: bulan,
          datasets: [
            {
              label: "Pupuk",
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              data: dataPupuk,
            },
            {
              label: "Air Isi Ulang",
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              data: dataAir,
            }

          ]
      },

      // Configuration options go here
      options: {}
  });

  var date = new Date()

  penjualan.grafikPenjualanPupuk(date.getFullYear()).then(data => {
    console.log('data pupuk', data)
    data.map(pup => {
      dataPupuk.push(pup.jumlah)
    })
    console.log(dataPupuk);
    chart.update()
  })

  penjualan.grafikPenjualanAir(date.getFullYear()).then(data => {
    console.log('data air', data)
    data.map(air => {
      dataAir.push(air.jumlah)
    })
    console.log(dataAir);
    chart.update()
  })
})