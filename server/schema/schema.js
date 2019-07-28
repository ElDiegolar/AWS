const graphql = require('graphql');
const _ = require('lodash');

const datalayer = require('../datalayer');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const PrinterType = new GraphQLObjectType({
    name: 'Printer',
    fields: () => ({
        pID: { type: GraphQLID },
        ip: { type: GraphQLString },
        status: { type: GraphQLString },
        name: { type: GraphQLString },
        //association
        log: {
            type: new GraphQLList(LogType),
            resolve(parent, args) {
                return parent.log;
            }
        }
    })
});

const LogType = new GraphQLObjectType({
    name: 'Log',
    fields: () => ({
        id: { type: GraphQLID },
        msg: { type: GraphQLString },
        date: { type: GraphQLString },
        printerId: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        printers: {
            type: GraphQLList(PrinterType),
            async resolve(parent, args) {
                const data = await datalayer.fetchTable('tPrinters');
                return data;
            }
        },
        printer: {
            type: PrinterType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                let data = await datalayer.fetchPrinterByKey(args.id);
                let logs = await datalayer.fetchTable('tPrinterLogs');
                // join table data from printer logs table 
                data.Item.log = _.filter(logs, (o) => o.printerId == args.id);
                return data.Item;
            }
        },
        logs: {
            type: GraphQLList(LogType),
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                const data = await datalayer.fetchTable('tPrinterLogs');
                let filteredData = _.filter(data, (o) => o.printerId == args.id)
                return filteredData;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addPrinter:{
            type:PrinterType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                pID: {type:new GraphQLNonNull( GraphQLID)},
                ip: {type: new GraphQLNonNull(GraphQLString)},
                status: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent,args){
                let printer = new Object({
                    name: args.name,
                    pID : args.pID,
                    ip : args.ip,
                    status : args.status,
                });
               await datalayer.savePrinter(printer);
            }
        },
        deletePrinter:{
            type:PrinterType,
            args:{
                pID: {type:new GraphQLNonNull( GraphQLID)},
            },
            async resolve(parent,args){
               await datalayer.deletePrinter(args.pID);
            }
        
        },
        addLog:{
            type:LogType,
            args:{
                printerId: {type :new GraphQLNonNull(GraphQLID)},
                id: {type: new GraphQLNonNull(GraphQLID)},
                msg: {type: GraphQLString},
                
            },
            async resolve(parent,args){
                let log = new Object({
                    printerId: args.printerId,
                id: args.id,
                msg:args.msg,
                date: new Date().toString()
                });
               await datalayer.saveLog(log);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
