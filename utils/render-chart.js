const penjualan = require('./penjualan')

var dataPupuk = []
var dataAir = []
var dataKeuntungan = []

let chartPupuk, chartAir, chartTransaksi

let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

exports.renderPupukChart = () => {
  // let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  var ctx = document.getElementById('pupukChart').getContext('2d');
  chartPupuk = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: setDataChart(bulan),
          datasets: [
            {
              label: "Pupuk (Kg)",
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              data: setDataChart(dataPupuk),
            },
            // {
            //   label: "Air Isi Ulang",
            //   backgroundColor: 'rgba(54, 162, 235, 0.2)',
            //   borderColor: 'rgba(54, 162, 235, 1)',
            //   data: dataAir,
            // }

          ]
      },

      // Configuration options go here
      options: {}
  });
}

exports.renderAirChart = () => {
  // let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  var ctx = document.getElementById('airChart').getContext('2d');
  chartAir = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: setDataChart(bulan),
          datasets: [
            {
              label: "Air Isi Ulang (Galon)",
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              data: setDataChart(dataKeuntungan),
            }

          ]
      },

      // Configuration options go here
      options: {}
  });
}

exports.renderTransaksiChart = () => {
  // let bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  var ctx = document.getElementById('transaksiChart').getContext('2d');
  chartTransaksi = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: setDataChart(bulan),
          datasets: [
            {
              label: "Transaksi",
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              data: setDataChart(dataAir),
            }

          ]
      },

      // Configuration options go here
      options: {}
  });
}

exports.setDataPupuk = (arg) => {
  //console.log(chart)
  dataPupuk = arg
  console.log('from util', dataPupuk)
  //exports.updateChart()
  // chart.data.datasets.forEach((dataset) => {
  //   dataset.data.push(dataPupuk);
  // });
  chart.data.datasets[0].data.push([5,6])
  chart.update()
}

exports.setDataAir = (arg) => {
  dataAir = arg
}

exports.updateChart = () => {
  chart.update()
}

exports.getChart = () => {
  return chart
}

exports.setGrafikPupuk = () => {
  var date = new Date()
  penjualan.grafikPenjualanPupuk(date.getFullYear()).then(data => {
    console.log('data pupuk', data)
    var dataPupuk = []
    data.map(pup => {
      dataPupuk.push(pup.jumlah)
    })
    console.log(dataPupuk);
    chartPupuk.data.datasets[0].data = setDataChart(dataPupuk)
    chartPupuk.update()
  })
}

exports.setGrafikAir = () => {
  var date = new Date()
  penjualan.grafikPenjualanAir(date.getFullYear()).then(data => {
    console.log('data pupuk', data)
    var dataPupuk = []
    data.map(air => {
      dataPupuk.push(air.jumlah)
    })
    console.log(dataPupuk);
    chartAir.data.datasets[0].data = setDataChart(dataPupuk)
    chartAir.update()
  })
}

exports.setGrafikTransaksi = () => {
  var date = new Date()
  penjualan.grafikTransaksi(date.getFullYear()).then(data => {
    console.log('data transaksi', data)
    var dataTransaksi = []
    data.map(trans => {
      dataTransaksi.push(trans.jumlah_transaksi)
    })
    chartTransaksi.data.datasets[0].data = setDataChart(dataTransaksi)
    chartTransaksi.update()
  })
}

function setDataChart(data){
  var date = new Date()
  var month = date.getMonth()
  if (parseInt(month) <= 6) {
    return data.slice(0,6)
  } else {
    return data.slice(6, 12)
  }
}