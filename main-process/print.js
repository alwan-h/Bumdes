const {ipcMain} = require('electron')
const { BrowserWindow } = require('electron')
const path = require('path')

ipcMain.on('data-pupuk-print', (event, arg) => {
  console.log(arg)
  const modalPath = path.join('file://', __dirname, '../subpages/pdf-gudang.html')
  let winPrint = new BrowserWindow({ width: 800, height: 600, show: false})

  winPrint.on('close', () => { winPrint = null })
  winPrint.loadURL(modalPath)

  winPrint.webContents.on('did-finish-load', () => {
  
    winPrint.webContents.send('data-table-pupuk', arg)
    winPrint.webContents.print()

  })
  
})

ipcMain.on('print-penjualan-pupuk', (event, arg) => {
  //console.log(arg)
  const modalPath = path.join('file://', __dirname, '../subpages/print-penjualan-pupuk.html')
  let winPrint = new BrowserWindow({ width: 800, height: 600, show: false})

  winPrint.on('close', () => { winPrint = null })
  winPrint.loadURL(modalPath)

  winPrint.webContents.on('did-finish-load', () => {
  
    winPrint.webContents.send('data-penjualan-pupuk', arg)
    winPrint.webContents.print()
    

  })
  
})

ipcMain.on('print-nota', (event, arg) => {
  console.log(arg)
  const modalPath = path.join('file://', __dirname, '../subpages/print-nota.html')
  let winPrint = new BrowserWindow({ width: 800, height: 600, show: false})

  winPrint.on('close', () => { winPrint = null })
  winPrint.loadURL(modalPath)

  winPrint.webContents.on('did-finish-load', () => {
  
    winPrint.webContents.send('data-print-nota', arg)
    winPrint.webContents.print()
    
  })
})