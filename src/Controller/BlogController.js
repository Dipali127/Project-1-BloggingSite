
const authorModel = require('../model/authorModel')
const validator = require('../validator/validator.js');

const blogModel = require('../model/blogModel.js');





const createBlog = async function (req, res) {
    try {
        let data = req.body
        let author = data.authorId
        let validation = await authorModel.findById(author)
        if (!validation) {
            res.status(400).send({ status: false, msg: " author is not present" })
        }
        if (data.isPublished) data.publishedAt = new Date()
        if (data.isDeleted) data.deletedAt = new Date()

        let savedData = await blogModel.create(data);
        res.status(201).send({ status: true, msg: savedData })
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

const update=async function(req,res)
 {
  try { 
    let blog=req.body
    let {title,body,tag,subcategory}=blog;
    // const title=req.body.title
    // const body=req.body.body
    // const tag=req.body.tag
    // const subcategory=req.body.subcategory
    let Id=req.params.blogId
    const data=await blogModel.findOneAndUpdate({_id:Id},{$set:{title:title,published:true,publishedAt:time.format(),body:body,$push:{tag:tag,subcategory:subcategory}}},{new:true})
    return res.status(200).send({status:true,msg:data})
}
catch(error){
    return res.status(500).send({status:false,msg:error.message})
}

 }

module.exports.createBlog=createBlog;
module.exports.update=update;


