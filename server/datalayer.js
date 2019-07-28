const AWS = require('aws-sdk');

let awsConfig = {
    "region": "us-east-2",
    "endpoint": "dynamodb.us-east-2.amazonaws.com",
    "accessKeyId": "AKIAY4ORESBBEGN4NIG3",
    "secretAccessKey":"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"
}

AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

const fetchPrinterByKey = async (key) =>{
    let params = {
        TableName: "tPrinters",
        Key:{
            "pID": key
        }
    };
    return  await docClient.get(params,function (err,data) {
        if(err){
            console.log("error fetching printers by key" + JSON.stringify(err));
           
        }
    }).promise();
};


const fetchTable = async (tableName) => {
    const params = {
        TableName: tableName,
    };

    let results = [];
    let items;
    do{
        items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => results.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");

    return results;

};

const deletePrinter = (pID) => {
    
    let params = {
        TableName: 'tPrinters',
        Key:{
            "pID":  pID.toString()
        } 
    };
    docClient.delete(params,(err)=>{
        if(err){
            console.log("error putting printers "+ JSON.stringify(err));
        }
    }).promise();
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const savePrinter = async (printer) => {
    printer.isDeleted = false;
    let date = new Date();
    let status =  getRandomInt(0,1) ? "Printer printed successfully": "Printer printed unsuccessfully";
    const randomLog = {
        printerId: printer.pID,
        id: getRandomInt(1,10000).toString(),
        msg:  status ,
        date: date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() 
    }

    
    const params = {
        TableName: 'tPrinters',
        Item: printer
    };
    await docClient.put(params,async (err)=>{
        if(err){
            console.log("error putting printers "+ JSON.stringify(err));
        }
        await saveLog(randomLog);
    }).promise();


};

const saveLog = async (log) => {
    const params = {
        TableName: 'tPrinterLogs',
        Item: log
    };
    await docClient.put(params,(err,data)=>{
        if(err){
            console.log("error putting printers logs "+ JSON.stringify(err));
            
        }
        else{
            console.log('the data =>,',data);
            
        }
    }).promise();
};

module.exports = {fetchPrinterByKey,fetchTable,savePrinter,saveLog,deletePrinter};
