const multer = require ('multer');
const fs = require ('fs')
const path = require ('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        var ruta = path.join(__dirname,`../`,`../`,`../`,`/datapdf`)
        
        if (fs.existsSync(`${ruta}`)){
            console.log('La carpeta existe');
        }else{
            fs.mkdir(`${ruta}`, function (err) {
                if(err){throw(err)}
            })
        }

        cb(null, `${ruta}` )
        cb(null, `./storage/imgs`)
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname + `.png`}`)
    }
  })
  
const upload = multer({ storage })
  
module.exports = upload 