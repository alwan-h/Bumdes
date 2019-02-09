//const Promise = require('bluebird')
const { ipcRenderer } = require("electron");

const penjualan = require("../utils/penjualan.js");
const barang = require("./barang.js");
const nota = require("./nota");

var count = 0;

exports.renderTbPenjualan = () => {
  var tbPenjualan = $("#data-penjualan");

  tbPenjualan
    .DataTable()
    .clear()
    .destroy();
  // tbPenjualan.children("tbody").empty();
  $("#data-penjualan tbody").empty();

  var param = { byID: null, byCategory: null, byNik: null };
  // ipcRenderer.send('get-penjualan', param)
  // ipcRenderer.on('data-penjualan', (event, arg) => {

  penjualan.getPenjualan(param).then(arg => {
    console.log(arg);
    dataTablePenjualan = [];
    arg.map(pj => {
      var dataItem = [
        "",
        pj.penjualan_id,
        pj.penjualan_insert_tanggal,
        pj.penjualan_nama,
        pj.penjualan_nik,
        pj.barang_nama,
        pj.penjualan_jumlah_barang + " " + pj.penjualan_satuan_barang,
        pj.penjualan_harga_barang,
        pj.penjualan_total_bayar,
        pj.metode_nama,
        pj.penjualan_status_pembayaran
      ];
      dataTablePenjualan.push(dataItem);
    });

    var tmpTbPenjualan = tbPenjualan.DataTable({
      destroy: true,
      retrieve: true,
      // searching: false,
      data: dataTablePenjualan,
      columns: [
        { title: "No." },
        { title: "ID" },
        { title: "Tanggal" },
        { title: "Nama Pembeli" },
        { title: "Nik" },
        { title: "Nama Barang" },
        { title: "Jumlah Barang" },
        { title: "Harga Barang" },
        { title: "Total Bayar" },
        { title: "Metode" },
        { title: "Lunas" },
        { title: "Nota" }
      ],
      //order: [[ 0, 'asc' ]],
      dom: "Bfrtip",
      buttons: [
        "csv",
        "excel",
        "pdf"
        // {
        //   text: 'Print',
        //   className: 'btn btn-default print-gudang',
        //   action: function ( e, dt, node, config ) {
        //     //alert( 'Button activated' );
        //     // var datapupuk = this.rows({ filter : 'applied'}).data()
        //     // var tempPup = []
        //     // datapupuk.map(pup => {
        //     //   tempPup.push(pup)
        //     // })
        //     // //console.log(tempPup)
        //     // //console.log(this.rows( { filter : 'applied'} ).data());
        //     // //console.log(this.rows( { filter : 'applied'} ).nodes().data());

        //     // ipcRenderer.send('data-pupuk-print', tempPup)
        //     //handlePrintGudang(tempPup)
        //   }
        // }
      ],
      columnDefs: [
        {
          targets: -1,
          data: null,
          defaultContent:
            "<button class='btn btn-primary btn-sm btn-nota-modal'>Nota</button>"
        }
      ]
    });

    // console.log("tb", $("#data-penjualan"));

    if (count == 1) {
      $("#data-penjualan tbody").on(
        "click",
        "button.btn-nota-modal",
        function() {
          // console.log("click tb", $("#data-penjualan tbody"));
          var data = tbPenjualan
            .DataTable()
            .row($(this).parents("tr"))
            .data();
          console.log(data);
          console.log(tbPenjualan.DataTable().row($(this)));
          // alert(data[1] + "'s salary is: " + data[1]);
          var tbNota = $("#data-list-nota tbody");
          var arg = {
            id: data[1]
          };
          tbNota.empty();
          nota.getNota(arg).then(n => {
            console.log("data nota", n);
            n.map((m, index) => {
              tbNota.append(
                "<tr>" +
                  `<td>${index + 1}</td>` +
                  `<td>${m.tanggal_pembayaran}</td>` +
                  `<td><button class="btn btn-primary btn-sm btn-print-nota" data-id="${
                    m.nota_id
                  }">Print</button></td>` +
                  "</tr>"
              );
            });
            btnPrintNota();
          });
          // $("#id").text("Data " + data[1]);

          $("#nota_list_modal").modal("show");
        }
      );
    } else {
      $("#data-penjualan tbody").bind(
        "click",
        "button.btn-nota-modal",
        function() {
          // console.log("click tb", $("#data-penjualan tbody"));

          var data = tbPenjualan
            .DataTable()
            .row($(this).parents("tr"))
            .data();
          console.log(data);
          // alert(data[1] + "'s salary is: " + data[1]);
          var tbNota = $("#data-list-nota tbody");
          if (data != undefined) {
            var arg = {
              id: data[1]
            };
            tbNota.empty();
            nota.getNota(arg).then(n => {
              console.log("data nota", n);
              n.map((m, index) => {
                tbNota.append(
                  "<tr>" +
                    `<td>${index + 1}</td>` +
                    `<td>${m.tanggal_pembayaran}</td>` +
                    `<td><button class="btn btn-primary btn-sm btn-print-nota" data-id="${
                      m.nota_id
                    }">Print</button></td>` +
                    "</tr>"
                );
              });
              btnPrintNota();
            });
            // $("#id").text("Data " + data[1]);

            $("#nota_list_modal").modal("show");
          }
        }
      );
    }

    tmpTbPenjualan
      .on("order.dt search.dt", function() {
        tmpTbPenjualan
          .column(0, { search: "applied", order: "applied" })
          .nodes()
          .each(function(cell, i) {
            cell.innerHTML = i + 1;
          });
      })
      .draw();

    tmpTbPenjualan.draw();
    // tbPenjualan.DataTable().destroy();
    // tbPenjualan.children("tbody").empty();
  });

  count++;
};

function btnPrintNota() {
  $(".btn-print-nota").click(function() {
    var notaId = $(this).attr("data-id");
    console.log(notaId);
    var arg = {
      id: null,
      notaId: notaId
    };

    nota.getNota(arg).then(data => {
      console.log(data);

      $("#nota-tanggal").text(data[0].tanggal_pembayaran);
      $("#nota-nama").text(data[0].penjualan_nama);
      $("#nota-ket").text(data[0].metode_nama);
      $("#nota-nama-barang").text(data[0].barang_nama);
      $("#nota-jumlah-barang").text(data[0].penjualan_jumlah_barang);
      $("#nota-satuan-barang").text(data[0].penjualan_satuan_barang);
      $("#nota-harga-barang").text(data[0].barang_harga_jual);
      $("#nota-jumlah-pembayaran").text(data[0].dibayar_sekarang);
      $("#nota-total").text(data[0].total_harga);
      $("#nota-dp").text(data[0].sudah_dibayar);
      $("#nota-sisa").text(data[0].total_harga - data[0].sudah_dibayar);
      $("#nama-konsumen").text(data[0].penjualan_nama);
      $("#nama-kasir").text(sessionStorage.getItem("user_username"));

      $("#nota_modal").modal("show");

      var data = {
        nota_tanggal: data[0].tanggal_pembayaran,
        nota_nama: data[0].penjualan_nama,
        nota_ket: data[0].metode_nama,
        nota_nama_barang: data[0].barang_nama,
        nota_jumlah_barang: data[0].penjualan_jumlah_barang,
        nota_satuan_barang: data[0].penjualan_satuan_barang,
        nota_harga_barang: data[0].barang_harga_jual,
        nota_total: data[0].total_harga,
        nota_dp: data[0].sudah_dibayar,
        nota_sisa: data[0].total_harga - data[0].sudah_dibayar,
        nama_konsumen: data[0].penjualan_nama,
        nota_jumlah_pembayaran: data[0].dibayar_sekarang,
        nama_kasir: sessionStorage.getItem("user_username")
      };

      $("#print-nota").click(function() {
        console.log("click print nota");
        // clearValue()
        ipcRenderer.send("print-nota", data);
      });
    });
  });
}

exports.renderJenisBarang = () => {
  var jenisBarang = $("#jenisBarang");
  var param = { category: null };
  barang.getBarang(param).then(data => {
    jenisBarang.empty();
    jenisBarang.append("<option></option>");
    console.log("data barang kasir", data);
    data.map(barang => {
      if (barang.barang_stock != 0 || barang.barang_stock != "") {
        jenisBarang.append(
          `<option value="${barang.barang_id}" data-harga="${
            barang.barang_harga_jual
          }" data-nama="${barang.barang_nama}">${barang.barang_nama}</option>`
        );
      }
    });
  });
};
