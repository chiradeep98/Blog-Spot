const express = require('express');
const multer = require('multer');
const path = require('path')
const { addNewBlog, postAddNewBlog, seeFullBlog, addComment } = require('../controller/handler');

const blogRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.resolve('./public/uploads'));
    },
    filename: function(req, file, cb){
        const filename = `${Date.now()} - ${file.originalname}`;
        cb(null, filename);
    },
});
const upload = multer({storage: storage});

blogRouter.get('/add-blog', addNewBlog);


blogRouter.post('/add-blog', upload.single('coverImageUrl'), postAddNewBlog);

blogRouter.get('/:id', seeFullBlog);

blogRouter.post('/comment/:blogId', addComment);



module.exports = blogRouter;