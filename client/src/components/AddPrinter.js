import React from 'react';
import {addPrinterMutationQuery,getPrinterQuery, getPrintersQuery} from '../queries/queries.js'
import { graphql,compose } from 'react-apollo';
import { useState } from "react";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function AddPrinter(props) {
   
    let[name,setName] = useState("");
    let[ip,setIp]= useState("");
    let[isActive,setIsActive] = useState("");

    const submitForm = async () => {
        console.log(`Printer added!
             Printer name: ${name} 
             status: ${isActive}
             IP Address: ${ip}`); 
             await props.addPrinterMutationQuery({
                 variables:{
                     name,
                     ip,
                     isActive: isActive === true? 'active': 'inactive',
                     pID: getRandomInt(1,10000)
                 },
                 refetchQueries:[{query:getPrintersQuery}]
             });
    }

    const handleSubmit = async event => {
        if (event) {
        event.preventDefault();
        }
        submitForm();
    };
  
    const handleInputChange = event => {
      event.persist();
      switch(event.target.name){
          case "name": setName(event.target.value); break;
          case "ip": setIp(event.target.value); break;
          case "isActive" : setIsActive(event.target.checked); break;
          default: break;
      }
    };
     
    return (
        <form id="add-printer" onSubmit={handleSubmit}>
            <div className="field">
                <label>Printer name:</label>
                <input name="name" value={ name } type="text" onChange={handleInputChange} required />
            </div>
            <div className="field">
            <label>is active:</label>
                <input  name="isActive" value={isActive}  type="checkbox" onChange={handleInputChange} />
            </div>
            <div className="field">
                <label>IP:</label>
                <input  name="ip"  value={ip}  type="text" onChange={handleInputChange} />
            </div>
            <button type="submit">+</button>
        </form >
    );
};

export default compose(
   // connect(mapStateToProps, mapDispatchToProps),
    graphql(addPrinterMutationQuery,{name: "addPrinterMutationQuery"}),
    graphql(getPrinterQuery,{name: "getPrinterQuery"})
)(AddPrinter);