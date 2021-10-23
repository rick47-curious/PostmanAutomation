const excel = require('read-excel-file/node');
const apitest = require('./apitest');



let service_name = process.argv[2];
let env_name = process.argv[3];

//Read excel sheet to determine Postman collection details - env,collection,datasheet etc
excel('./src/testdata.xlsx').then((rows) => {
    let rootDir = "./";
    let testDetails = {};

    //console.log(rows);
    //console.table(rows);
    
    //For each of record in runner file , newman call to be made.
    //Service name value will come from Jenkins parameter
    //all - all service present in the testparameters will be executed
    //console.log(service_name);

    
    if (service_name == "all"){
        let executeFlag = null;
        for (i in rows){
            if (i==0){ //just to exclude headers
                continue;
            }
            console.log("testdetails formation starts....");
           
            testDetails.locateCollections = rootDir + "collections/" + rows[i][0];
            testDetails.locateData = rootDir + "datasets/" + rows[i][1];
            testDetails.iterationCount = rows[i][2];
            testDetails.foldername = rows[i][3];
            testDetails.locateEnv = rootDir + "environments/" + rows[i][5];
            testDetails.reportTitle = rows[i][7];
            testDetails.reportDir = "./newman/"+ rows[i][8];
            executeFlag = true;
            if (executeFlag){
                apitest(testDetails);
            }
        }
       
    }
    else{
        for (i in rows){
            let executeFlag= null;
            if (i==0){ //just to exclude headers
                continue;
            }
            //Specific service to be executed will come from Jenkins parameter
            //Check if the specific service setup is found, if yes then proceed
            //else continue to fetch the next record from the testParameter sheet
            if (rows[i][8] === service_name){
                executeFlag = true;
                console.log(service_name + " wil be executed now");
            }else{
                continue;
            }
            // rootDir + "collections/" + rows[i][0];
            // rootDir + "datasets/" + rows[i][1]
            testDetails.locateCollections = rootDir + "collections/" + rows[i][0];
            testDetails.locateData =  rootDir + "datasets/" + rows[i][1];
            testDetails.iterationCount = rows[i][2];
            testDetails.foldername = rows[i][3];
            testDetails.globalData = rootDir+"globals/MyWorkspace.postman_globals.json";
            //Get the environment details
            switch(env_name){
                case 'uat':
                    testDetails.locateEnv = rootDir + "environments/" + rows[i][3];
                    break;
                case 'tst':
                    testDetails.locateEnv = rootDir + "environments/" + rows[i][4];
                    break;
                case 'dev':
                    testDetails.locateEnv = rootDir + "environments/" + rows[i][5];
                    break;
                default:
                    testDetails.locateEnv = rootDir + "environments/" + rows[i][4];
            }
            testDetails.reportTitle = rows[i][6];
            testDetails.reportDir = "./newman/" + rows[i][7];
            console.log(testDetails);
            if (executeFlag){
                apitest(testDetails);
            }
        }
    }

},callback);

function callback(err,data){
if (err){
    throw err;
}else{
        console.log(data);
    }
}
