const barang = require('./barang.js')
const penjualan = require('./penjualan.js')

exports.renderTbAir = () => {
  let tableAir = $('#table-air-data tbody')
  var param = {category: 2} 
  barang.getBarang(param).then(data => {
    console.log('data air', data)
    tableAir.empty()
    var i = 1
    data.map((air, index) => {
      if (air.barang_category == '2') {
        tableAir.append(
          '<tr>'+
            `<td>${i++}</td>`+
            `<td>${air.barang_nama}</td>`+
            `<td>Rp. ${air.barang_harga_jual}</td>`+
            `<td><button class="btn btn-default btn-xs btn-edit-harga-air" data-id="${air.barang_id}" data-harga="${air.barang_harga_jual}" data-toggle="modal" data-target="#air_modal_edit">Edit</button> `+
            // `<button class="btn btn-danger btn-xs btn-delete-penj-pupuk" data-id="${air.barang_id}">Delete</button></td>`+
          '</tr>'
        )
      }
    })

    btnEditAir()
  })
}

function btnEditAir() {
  $('.btn-edit-harga-air').click(function() {
    var idAir = $(this).attr('data-id')
    var hargaAir = $(this).attr('data-harga')
    $('#harga_jual_air').val(hargaAir)
    $('#edit_air_id').val(idAir)
  })
}

exports.renderTbPenjulanAir = () => {
  let tableAirPenjulan = $('#table-air-penjualan')

  var param = {byID: null, byCategory: null, byNik: null}
  penjualan.getPenjualan(param).then(arg => {
      dataTablePenjualan = []
      arg.map(pj => {
        if (pj.barang_category == 2) {
          var dataItem = [
            '', pj.penjualan_insert_tanggal, pj.penjualan_nama, 
            (pj.penjualan_jumlah_barang+' '+pj.penjualan_satuan_barang), pj.penjualan_harga_barang, 
            pj.penjualan_status_pembayaran
          ]
          dataTablePenjualan.push(dataItem)
        }
      })

      var tmpTbPenjualan = tableAirPenjulan.DataTable({
        destroy: true,
        // searching: false,
        data: dataTablePenjualan,
        columns: [
            { title: "No." },
            { title: "Tanggal" },
            { title: "Nama Pembeli" },
            { title: "Jumlah Barang" },
            { title: "Harga Barang" },
            { title: "Status" },
        ],
        //order: [[ 0, 'asc' ]],
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf',
            // {
            //   text: 'Print',
            //   className: 'btn btn-default',
            //   action: function ( e, dt, node, config ) {
            //     // alert( 'Button activated' );
            //     var datapupuk = this.rows({ filter : 'applied'}).data()
            //     var tempPup = []
            //     datapupuk.map(pup => {
            //       tempPup.push(pup)
            //     })
            //     console.log(tempPup)
            //     // //console.log(this.rows( { filter : 'applied'} ).data());
            //     // //console.log(this.rows( { filter : 'applied'} ).nodes().data());
                
            //     //ipcRenderer.send('print-penjualan-pupuk', tempPup)
            //     //printPenjualanPupuk(tempPup)
            //   }
            // }
        ]
      })

      tmpTbPenjualan.on( 'order.dt search.dt', function () {
        tmpTbPenjualan.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
      } ).draw();

      tmpTbPenjualan.draw()

    })
  
}