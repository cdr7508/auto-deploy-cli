const path = require( 'path' )
let fs = require( 'fs' )
const { errorLog } = require('./index');

function copyFile( readFilePath, writeFilePath ) {
  checkPath()
  fs.readFile( readFilePath, 'utf-8', function ( err, data ) {
    if ( err ) {
      errorLog( '文件读取异常,可能是文件损坏!多次异常请重新安装使用!' )
    } else {
      writeFile( writeFilePath, data )
    }
  } )
}

function writeFile( writeFilePath, data ) {
  fs.writeFile( writeFilePath, data, { 'flag': 'a' }, function ( error ) {
    if ( error ) {
      console.log( error )
    }
  } )
}

function checkPath() {
  const p = path.join( process.cwd(), 'deploy' )
  fs.access( p, fs.constants.F_OK, () => {
    fs.mkdir( p, function ( err ) {
      if ( err ) {
        console.log( err )
      }
    } )
  } )
}

copyFile( path.join( __dirname, 'deploy.config.js' ), path.join( process.cwd(), 'deploy/deploy.config.js' ) )

module.exports = {
  copyFile
}