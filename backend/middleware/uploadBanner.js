const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null, './uploads/banners')
    },
    filename:(req,file,cb)=>{

        cb(null, `${Date.now()}-os-${file.originalname}`)
    }


})

const filterImage = async (req, file,cb) => {

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const uploadsBanner = multer({
    storage: storage,
    fileFilter: filterImage,
    limits: { fileSize: 1024 * 1024 * 5 },

})



module.exports = uploadsBanner;