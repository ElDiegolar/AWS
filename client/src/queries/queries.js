import { gql } from 'apollo-boost';

const getPrinterQuery = gql`
{
    printers{
        name
        pID
        ip
        status
    }
}`;

const getPrinterDetailQuery = gql`
query GetPrinter($id: ID!){
        printer(id: $id){
        name
        pID
        ip
        status
        log{
            id
            printerId
            msg
            date
        }
    }
}
`;


const getPrintersQuery = gql`
{
    printers{
        name
        pID
    }
}
`;


const addPrinterMutationQuery = gql`
    mutation addPrinter($name:String!, $pID:ID!, $ip:String!,$isActive:String!){
        addPrinter(name: $name,pID: $pID,ip: $ip,status: $isActive){
            name
            pID
        }
    }
`;

const addPrinterLogQuery = gql`
    mutation addPrinterLog($printerId:String!, $id:ID!, $msg:String!){
        addLog(printerId: $printerId,id: $id,msg: $msg){
            name
        }
    }
`;

const deletePrinterQuery = gql`
mutation deletePrinter($pID:ID!){
    deletePrinter(pID: $pID){
                pID
    }
}
`;


export {getPrinterQuery,addPrinterMutationQuery,getPrintersQuery,getPrinterDetailQuery,deletePrinterQuery,addPrinterLogQuery}