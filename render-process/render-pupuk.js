const {ipcRenderer} = require('electron')
const renderPupuk = require('../utils/render-tb-pupuk')

$(document).ready(function() {
  let tableJenisPupuk = $('#pupuk-table-jenis-pupuk tbody')
  let pupukDataPembelian = $('#pupuk-data-pembelian')
  let pupukDataPenjualan = $('#pupuk-data-penjualan')

  // let btnEditDataPupuk = $('#edit_data_pupuk')

  //renderJenisPupuk()
  //renderDataPembelian()
  //renderDataPenjualan()
  renderPupuk.renderTbPupuk()
  renderPupuk.renderTbPembelian()
  renderPupuk.renderTbPenjualan()
  
  // btnEditDataPupuk.click(function(e) {
  //   e.preventDefault()
  //   console.log('edit data pupuk')
  //   var editNama = $('#edit_nama_pupuk')
  //   var editHarga = $('#edit_harga_jual')
  //   var editKuota = $('#edit_kuota')
  //   var editId = $('#edit_pupuk_id')

  //   var arg = [editNama.val(), editHarga.val(), editKuota.val(), editId.val()]

  //   ipcRenderer.send('update-barang', arg)
  //   ipcRenderer.on('notif-update-barang', (event, arg) => {
  //     console.log(arg)
  //     if (arg) {
  //       $('#pupuk_modal_edit').modal('hide')
  //       renderJenisPupuk()
  //     }
  //   })
  // })

  function renderJenisPupuk() {
    var param = {category: 'Pupuk'} 
    ipcRenderer.send('get-barang', param)
    ipcRenderer.on('data-barang', (event, arg) => {
      tableJenisPupuk.empty()
      //jenisPupuk.empty()
      //jenisPupuk.append('<option value="">Pilih Jenis Pupuk</option>')
      //console.log(arg)
      arg.map((jenis, index) => {
        // jenisPupuk.append(
        //   '<option value="'+jenis.barang_id+'">'+jenis.barang_nama+'</option>'
        // )
        if (jenis.barang_category == 1) {
          tableJenisPupuk.append(
            `<tr>`+
              `<td>${index+1}</td>`+
              `<td>${jenis.barang_nama}</td>`+
              `<td>${jenis.barang_harga_jual}</td>`+
              `<td>${jenis.barang_kuota}</td>`+
              `<td>${jenis.barang_stock} Kg</td>`+
              `<td><button class="btn btn-default btn-xs btn-edit-pupuk" data-id="${jenis.barang_id}" data-toggle="modal" data-target="#pupuk_modal_edit">Edit</button> `+
              `<button class="btn btn-danger btn-xs btn-delete-pupuk" data-id="${jenis.barang_id}">Delete</button></td>`+
            `</tr>`
          )
        }
      })
      btnEditPupuk()
      btnDeletePupuk()
    })
    
  }

  function btnDeletePupuk() {
    $('.btn-delete-pupuk').click(function() {
      var c = confirm('Apakah anda yakin ?')
      if (c) {
        var id = $(this).attr('data-id')
        ipcRenderer.send('delete-barang', id)
        ipcRenderer.on('notif-delete-barang', (event, arg) => {
          if (arg) {
            //renderJenisPupuk()
            renderPupuk.renderTbPupuk().then(() => {
              btnEditPupuk()
              btnDeletePupuk()
            })
          }
        })
      }
    })
  }

  function btnEditPupuk() {
    $('.btn-edit-pupuk').click(function() {
      
      var id = $(this).attr('data-id')
      console.log('edit pupuk', {id: id})
      ipcRenderer.send('get-barang-by-id', id)
      ipcRenderer.on('data-barang-by-id', (event, arg) => {
        console.log('data by id', arg)
        $('#edit_nama_pupuk').val(arg[0].barang_nama)
        $('#edit_harga_jual').val(arg[0].barang_harga_jual)
        $('#edit_kuota').val(arg[0].barang_kuota)
        $('#edit_pupuk_id').val(id)
        renderPupuk.renderTbPupuk().then(() => {
          btnEditPupuk()
          btnDeletePupuk()
        })
      })
      
    })
  }

  function renderDataPembelian() {
    arg = {
      parameter: {
        byId: false,
        byName: false
      }
    }
    ipcRenderer.send('get-pembelian', arg)
    ipcRenderer.on('send-pembelian', (event, arg) => {
      //console.log('data pembelian', arg)
      datatablePupuk = []

      arg.map((pupuk, index) => {
        dataItem = [index+1, pupuk.barang_nama, pupuk.pembelian_jumlah+' '+pupuk.pembelian_satuan, 'Rp. '+pupuk.pembelian_harga_total, pupuk.pembelian_tanggal]
        datatablePupuk.push(dataItem)
      })

      var tbPupukPembelian = pupukDataPembelian.DataTable({
        destroy: true,
        data: datatablePupuk,
        columns: [
            { title: "No." },
            { title: "Jenis Pupuk" },
            { title: "Jumlah" },
            { title: "Harga Beli" },
            { title: "Tanggal Beli" },
        ],
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf',
            // {
            //   text: 'Print',
            //   className: 'btn btn-default print-gudang',
            //   action: function ( e, dt, node, config ) {
            //     //alert( 'Button activated' );
            //     var datapupuk = this.rows({ filter : 'applied'}).data()
            //     var tempPup = []
            //     datapupuk.map(pup => {
            //       tempPup.push(pup)
            //     })
            //     console.log(tempPup)
            //     //console.log(this.rows( { filter : 'applied'} ).data());
            //     //console.log(this.rows( { filter : 'applied'} ).nodes().data());
                
            //     ipcRenderer.send('data-pupuk-print', tempPup)
            //     //handlePrintGudang()
            //   }
            // }
        ]
      })

      tbPupukPembelian.on( 'order.dt search.dt', function () {
        tbPupukPembelian.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
      } ).draw();

      tbPupukPembelian.draw()
    }) 
  }

  function renderDataPenjualan() {
    var param = {byID : null}
    ipcRenderer.send('get-penjualan', param)
    ipcRenderer.on('data-penjualan', (event, arg) => {
      dataTablePenjualan = []
      arg.map(pj => {
        if (pj.barang_category == 1) {
          var dataItem = [
            '', pj.penjualan_insert_tanggal, pj.penjualan_nama, pj.penjualan_nik, pj.barang_nama,
            (pj.penjualan_jumlah_barang+' '+pj.penjualan_satuan_barang), pj.penjualan_harga_barang, 
            pj.metode_nama, pj.penjualan_status_pembayaran
          ]
          dataTablePenjualan.push(dataItem)
        }
      })

      var tmpTbPenjualan = pupukDataPenjualan.DataTable({
        destroy: true,
        // searching: false,
        data: dataTablePenjualan,
        columns: [
            { title: "No." },
            { title: "Tanggal" },
            { title: "Nama Pembeli" },
            { title: "Nik" },
            { title: "Nama Barang" },
            { title: "Jumlah Barang" },
            { title: "Harga Barang" },
            { title: "Metode" },
            { title: "Status" },
        ],
        //order: [[ 0, 'asc' ]],
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf',
            {
              text: 'Print',
              className: 'btn btn-default',
              action: function ( e, dt, node, config ) {
                // alert( 'Button activated' );
                var datapupuk = this.rows({ filter : 'applied'}).data()
                var tempPup = []
                datapupuk.map(pup => {
                  tempPup.push(pup)
                })
                console.log(tempPup)
                // //console.log(this.rows( { filter : 'applied'} ).data());
                // //console.log(this.rows( { filter : 'applied'} ).nodes().data());
                
                ipcRenderer.send('print-penjualan-pupuk', tempPup)
                //printPenjualanPupuk(tempPup)
              }
            }
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
  
})