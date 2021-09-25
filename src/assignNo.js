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
      
       fs.writeFileSync("./utility/readno1.txt",aNo.toString(),function(){
           if (err){
               console.log(err);
           }
       });
       fs.writeFileSync("./utility/readno2.txt",bNo.toString(),function(){
        if (err){
            console.log(err);
        }
       });
    });
}

function updateGlobals(){
    const updatedGlobals= {
        "values":[
            {
                "key":'assignno1',
                "value":readData("readno1.txt"),
                "enabled":true
            },
            {
                "key":'assignno2',
                "value":readData("readno2.txt"),
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

function readData(filename){

      let latestNo =  fs.readFileSync("./utility/"+filename,function(err,data){
            if (err){
                console.log(err);
            }
        });
        return latestNo.toString();
}

module.exports = {incrementNo,updateGlobals}


