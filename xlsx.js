import React, { useState } from "react";
import * as XLSX from "xlsx";

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  // Function to convert Excel date serial to JavaScript Date
  const excelDateToJSDate = (serial) => {
    const excelEpoch = new Date(1900, 0, 1); // Excel's epoch date (Jan 1, 1900)
    const jsDate = new Date(excelEpoch.getTime() + (serial - 1) * 24 * 60 * 60 * 1000); // Convert days to ms
    return jsDate;
  };

  const isValidDate = (value) => {
    return value instanceof Date && !isNaN(value);
  };

  const isDecimal = (value) => {
    return typeof value === "number" && value % 1 !== 0;
  };

  const validateData = (data) => {
    const errors = [];
    const errObj = [];
    let obj = {}
    const expectedSchema = {
      InventoryDate: "date",
      Warehouse: "string",
      Category: "string",
      Brand: "string",
      Product: "string",
      ProductPack: "ProductPack",
      CaseQty: "number",
      PieceQty: "number",
      PackQty: "number",
      CasePrice: "decimal",
      PiecePrice: "decimal",
      PackPrice: "decimal",
      TotalValue: "decimal",
    };

    data.forEach((row, rowIndex) => {
      Object.keys(expectedSchema).forEach((field) => {
        const expectedType = expectedSchema[field];
        // console.log(row);
        // console.log(expectedType,"ProductPack");
        
        const value = row[field];
        obj["index"] = rowIndex
        if (expectedType === "date") {
          if (!isValidDate(value)) {
            errors.push(
              `Row ${rowIndex + 1}: Expected ${field} to be a valid date, got ${value}`
            );
            obj["index"] = rowIndex
            obj["err"+field] = "err"+field
          }
        } else if (expectedType === "decimal") {
          if (!isDecimal(value)) {
            errors.push(
              `Row ${rowIndex + 1}: Expected ${field} to be a decimal, got ${value}`
            );
            obj["index"] = rowIndex
            obj["err"+field] = "err"+field
          }

        }else if (expectedType === "number") {
          if (isDecimal(value)) {
            errors.push(
              `Row ${rowIndex + 1}: Expected ${field} to be a decimal, got ${value}`
            );
            obj["index"] = rowIndex
            obj["err"+field] = "err"+field
          }
        }
        else if(expectedType === "ProductPack"){
          console.log(typeof value,value);
          
          if (typeof value !== "string") {
            errors.push(
              `Row ${rowIndex + 1}: Expected ${field} to be a ${"string"}, got ${typeof value} mass`
            );
            obj["index"] = rowIndex
            obj["err"+field] = "err"+field
          }
          if(value?.length > 300){
            errors.push(
              `Row ${rowIndex + 1}: Expected ${field} to be a greater that 300`
            );
            obj["index"] = rowIndex
            obj["err"+field] = "err"+field
          }
          // console.log("mass");
          
        }
        
        else {


          
          const actualType = typeof value;
          if (actualType !== expectedType) {
            errors.push(
              `Row ${rowIndex + 1}: Expected ${field} to be a ${expectedType}, got ${actualType}`
            );
            obj["index"] = rowIndex
            obj["err"+field] = "err"+field
          }
        }

       
      });
      // console.log(obj);
      
      errObj.push(obj);
      obj = {}
    });

    return {errors,errObj};
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet, { raw: true });
        // Convert InventoryDate field to Date object if it's an Excel serial
        data.forEach((row) => {
          if (typeof row.InventoryDate === "number") {
            row.InventoryDate = excelDateToJSDate(row.InventoryDate);
          }
        });

        const errors = validateData(data);
        setTableData(data);
        data.map((item,index)=>{
          if(errors.errObj[index]){
            Object.keys(errors.errObj[index]).map(it=>{
              item[it] = errors.errObj[index][it]      
            }) 
          }
          
        })
        // console.log(data);
        
        setValidationErrors(errors.errors);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {validationErrors.length > 0 && (
        <div>
          <h4>Validation Errors:</h4>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {tableData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(tableData[0]).map((key, index) => {
                    const errValue = String(key)
                    if(errValue.slice(0, 3) !== "err" && errValue!=="index"){
                      return <th key={index}>{key}</th>
                    }
              }
                
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => {
              
              let isColorData = [];
               Object.keys(row).filter(item =>{  
                if(item.slice(0,3)==="err"){
                  isColorData.push(item.slice(3))
                  return item.slice(3)
                }
               });

               console.log(isColorData);
               
              
              return(
              <tr key={rowIndex}>
                
                {/* {Object.keys(row).map((value, colIndex) => {
                   const errValue = String(row[value]);  
                   if(errValue.slice(0, 3) !== "err" && value !== "index"){
                    let isColor = isColorData.some(item =>row[value] === row[item] )
                      return  <td key={colIndex} style={{color:`${isColor? 'red':''}`}}>
                      {row[value] instanceof Date
                        ? row[value].toLocaleDateString()
                        : String(row[value])}
                    </td>
                   }
                
                 
                  }
                )} */}
              </tr>
            )})}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
