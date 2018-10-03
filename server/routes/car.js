// 文字识别
const express = require('express');
const router = express.Router();
const baiduai = require('./baiduai-config');

const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
    cb(null,'./assets');
},
filename:(req,file,cb)=>{
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
}
});
const upload = multer({storage:storage});
const fs = require('fs');
const hhtp = require('http');

// 上传文件，车型识别
router.post('/assets',upload.single('car'),(req,res,next)=>{
    console.log(req.file);
var imageFile = req.file.filename;
let AipOcr = require('baidu-aip-sdk').imageClassify;
let client = new AipOcr(baiduai.APP_ID,baiduai.API_KEY,baiduai.SECRET_KEY);
var image = fs.readFileSync("assets/"+imageFile).toString("base64");
var imageText = '没有解析成功';
client.carDetect(image).then(function(result) {
    console.log(JSON.stringify(result));
    imageText = JSON.stringify(result);
    res.end(imageText);
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});
// 解析完后删除文件
fs.unlink("assets/"+imageFile,function (err) {
    if(err){
        console.log(err)
    }
})
});

module.exports = router