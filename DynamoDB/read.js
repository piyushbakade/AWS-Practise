console.log("starting function");

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({region:'us-east-1'});

exports.handle = function(e, ctx, callback){

    let scanningParameters={
        TableName:"Books",
        Limit:100
    };

    docClient.scan(scanningParameters, function(err,data){
        if(err){
            callback(err,null);
        }else{
            callback(null,data);
        }
    });

    // var params = {
    //     TableName: 'Books',
    //     Key:{

    //     }
    // }

    // docClient.get(params, function(err,data){
    //     if(err){
    //         callback(err, null);
    //     }else{
    //         callback(null, data);
    //     }
    // })
}