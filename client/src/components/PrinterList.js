import React from 'react';
import {graphql,compose} from 'react-apollo';
import {addPrinterMutationQuery, getPrintersQuery,getPrinterDetailQuery, deletePrinterQuery} from '../queries/queries.js'
import PrinterDetails from './PrinterDetails.js';
import { useState } from "react";

// functional components
function PrinterList(props) {

    let[selectedPrinter,setSelectedPrinter] = useState(null);
    async function deletePrinter(printerId){
        await props.deletePrinterQuery({
            variables:{
                pID: printerId
            },
            refetchQueries:[{query:getPrintersQuery}]
        })
    }
    function displayPrinters() {
        let data = props.getPrintersQuery.printers
         if(props.getPrintersQuery.loading){
             return(<div>Loading printers list ...</div>);
         }else{
             return data.map(printer => {
                return( <li key={printer.pID}>
                            <span onClick={(e)=> {setSelectedPrinter(printer.pID)}}>{printer.name} </span>
                            <button onClick={(e)=> {deletePrinter(printer.pID)}} > delete </button>
                        </li>
                      );
             })
         }
     }
    
    return (
      <div  className="App">
        <ul id="printer-list">
        {displayPrinters()}
      </ul>
      <PrinterDetails printerId={selectedPrinter}></PrinterDetails>
      </div>
    );
  };

  export default 

  compose(
     graphql(getPrintersQuery, {name:"getPrintersQuery"}),
     graphql(getPrinterDetailQuery, {name:"getPrinterDetailQuery"}),
     graphql(deletePrinterQuery, {name:"deletePrinterQuery"}),
     graphql(addPrinterMutationQuery,{name: "addPrinterMutationQuery"}),
    
 )(PrinterList);

