const divison = require('../../models/division');
const uuidv4 = require('uuid/v4');
module.exports = (req, res, next) => {
    //Some db related work
    let division_id = uuidv4();
        let divisionData = new divison({
            name: req.body.name,
            division_id:division_id,
            type:req.body.type
        });
        divisionData.save(function(err,result){
            if(err){
               res.send({success:false,message:err}); 
            }
            else{
                res.send({successs:true,message:"Added Division/Group/Organization successfully"});
            }
        })
}