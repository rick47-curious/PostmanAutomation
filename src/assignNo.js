const fs = require("fs");

function incrementNo(){
 
 fs.readFile("./globals/MyWorkspace.postman_globals.json",function(err,data){
        if (err){
            console.log(err);
        }
        let globalJson = JSON.parse(data.toString());
        //console.log(globalJson);

       aNo =  parseInt(globalJson.values[0].value) + 2;
       bNo =  parseInt(globalJson.values[1].value) + 2;
    
    updateGlobals(aNo,bNo);
    });
}

function updateGlobals(arg1,arg2){
    const updatedGlobals= {
        "values":[
            {
                "key":'assignno1',
                "value":arg1,
                "enabled":true
            },
            {
                "key":'assignno2',
                "value":arg2,
                "enabled":true
            }
        ]
    };
    fs.writeFileSync("./globals/MyWorkspace.postman_globals.json",JSON.stringify(updatedGlobals),function(err){
        if (err){
            console.log(err);
        }
    });

  }


module.exports = {incrementNo}


