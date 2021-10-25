const { on } = require('events');
const newman = require('newman');
const assignNo = require('./assignNo');

module.exports = function(testDetails){
    
        if (testDetails.iterationcount != null){
            console.log("Testing with selected data")
            newman.run({
                collection: testDetails.locateCollections,
               // iterationData: testDetails.locateData,
               // iterationCount: testDetails.iterationCount,
                globals:testDetails.globalData,
                environment: testDetails.locateEnv,
                reporters: ['cli','htmlextra'],
                reporter:{
                    htmlextra:{
                    title: testDetails.reportTitle,
                    export: testDetails.reportDir,
                    logs: true
                     }
                },
                color: 'on'
            },callback);
        }else{
        console.log("Testing with all data");
        newman.run({
            collection: testDetails.locateCollections,
            iterationData: testDetails.locateData,
            
           // folder: [testDetails.foldername],
            environment: testDetails.locateEnv,
            globals:testDetails.globalData,
            reporters: ['cli','htmlextra'],
            reporter:{
                htmlextra:{
                title:testDetails.reportTitle,
                export:testDetails.reportDir,
                logs:true
                 }
            },
            color: 'on'
        },callback);       
    }
}

function callback(err){
    if (err){
        throw err;
    }else{
    if (process.argv[2] == 'usercreation'){
        assignNo.incrementNo();
    }
    console.log("Collection run completed")
}
}

