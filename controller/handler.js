const blogModel = require('../model/blog');
const userModel = require('../model/user');
const commentModel = require('../model/comments');




async function handlerHome(req, res) {
    const allBlogs = await blogModel.find({});
    return res.render('home', {
        user: req.user,
        allBlogs: allBlogs,
    });
}

async function handlerSignup(req, res) {
    return res.render('signup');
}

async function postHandlerSignup(req, res) {
    const { fullname, email, password } = req.body;
    userModel.create({
        fullname: fullname,
        email: email,
        password: password,
    });

    res.redirect('/');
}

async function handlerSignin(req, res) {
    return res.render('signin');
}

async function postHandlerSignin(req, res) {
    const { email, password } = req.body;
    try {
        const token = await userModel.matchPasswordAndGenerateToken(email, password);
        // console.log('Token', token);
        return res.cookie('token', token).redirect('/');
    } catch (error) {
        res.render('signin', {
            error: 'Invalid Email or Password. Try Again.',
        });
    };
};

async function addNewBlog(req, res) {
    res.render('addBlog', {
        user: req.user,
    });
}


async function postAddNewBlog(req, res){
    const {title, body} = req.body;
    const blog = await blogModel.create({
        title: title,
        body: body,
        createdBy: req.user._id,
        coverImageUrl: `/uploads/${req.file.filename}`
    })

    return res.redirect(`/blog/${blog._id}`);

};

async function seeFullBlog(req, res){
    const _id = req.params.id;
    const blog = await blogModel.findById({_id}).populate('createdBy');
    const allComments = await commentModel.find({blogId: req.params.id})
    .populate('createdBy');
    res.render('blogPage', {
        user: req.user,
        blog: blog,
        allComments: allComments,
    });
}

async function addComment(req, res){
    const content = req.body.content;
    const comment = await commentModel.create({
        content: content,
        blogId: req.params.blogId,
        createdBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogId}`);
}


module.exports = {
    handlerHome,
    handlerSignup,
    postHandlerSignup,
    handlerSignin,
    postHandlerSignin,
    addNewBlog,
    postAddNewBlog,
    seeFullBlog,
    addComment,
}
