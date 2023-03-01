import { useState } from "react";
import { header } from "../../data/turbinesTableData";
import TableInput from "../TableInput/TableInput";

const TurbinesTable = () => {
   const [rowsNumber, setRowsNumber] = useState(1);

   const addRow = () => {
      setRowsNumber((rowsNumber) => rowsNumber + 1);
   };

   const renderRows = (columnsNumber: number, dataType: number) => {
      const rows = [];

      for (let i = 0; i < rowsNumber; i++) {
         rows.push(<tr key={i}>{renderRow(i, columnsNumber, dataType)}</tr>);
      }

      return rows;
   };

   const renderRow = (rowNumber: number, columnsNumber: number, dataType: number) => {
      const row = [];

      for (let i = 0; i < columnsNumber; i++) {
         row.push(
            <td key={i}>
               <TableInput monthNumber={rowNumber} valueType={i} dataType={dataType} />
            </td>
         );
      }

      return row;
   };

   const renderTable = (columns: string[], dataType: number) => {
      return (
         <table className="table table_string">
            <thead>
               <tr>
                  {columns.map((name, i) => (
                     <th key={i}>{name}</th>
                  ))}
               </tr>
            </thead>
            <tbody>{renderRows(columns.length, dataType)}</tbody>
         </table>
      );
   };

   return (
      <>
         <h2 className="subtitle">Турбины</h2>
         {renderTable(header, 2)}
         <button className="button" onClick={addRow}>
            Добавить строку
         </button>
      </>
   );
};

export default TurbinesTable;
