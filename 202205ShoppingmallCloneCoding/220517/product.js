const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') //모든파일이 uploads폴더안에 들어가게 됨
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
    

    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if(err) {
            return req.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })

    
})


router.post('/', (req, res) => {
    
  //받아 온 정보들을 DB에 넣어준다.

  const product = new Product(req.body)

  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err})
    return res.status(200).json({ success: true })
  })
  
})

router.post('/products', (req, res) => {

  //product collection에 들어 있는 모든 상품 정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .populate("writer")
    .skip(skip) //0번째부터 8개 가져와
    .limit(limit) //8개만 가져와
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({success: false, err})
      
      return res.status(200).json({
        success:true, ProductInfo,
      postSize: productInfo.length
      })
    })

})

module.exports = router;
