import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getPrinterDetailQuery } from '../queries/queries';

// heavy class component
class PrinterDetails extends Component {
    displayLogs(logs){
        if(logs.length> 0){
           return logs.map(item => {
                return <li key={item.id}>
                Date: { item.date } <br/ > Message:{ item.msg }</li>
            })
        }
        return <div>This printer has no logs</div>
    }
    displayPrinterDetails(){
        const { printer } = this.props.data;
        if(printer){
            return(
                <div>
                    <h2>{ printer.name }</h2>
                    <p>id:{ printer.pID }</p>
                    <p>status: { printer.status }</p>
                    <p>IP: { printer.ip }</p>
                    <p>Printer logs:</p>
                    <ul className="other-books">
                    { this.displayLogs(printer.log)}
                    </ul>
                </div>
            );
        } else {
            return( <div>No printer selected...</div> );
        }
    }
    render(){
        return(
            <div id="printer-details">
                { this.displayPrinterDetails() }
            </div>
        );
    }
}

export default graphql(getPrinterDetailQuery, {
   // options: (props) => ({ variables: { userId: props.userId } })
    options: (props) => ({
            variables: {
                id: props.printerId
            }
    })
})(PrinterDetails);