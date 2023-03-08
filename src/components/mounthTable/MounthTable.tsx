import { header, months } from "../../data/moutnTableData";
import TableInput from "../TableInput/TableInput";

const MounthTable = () => {
   const renderRow = (rowNumber: number, columnsNumber: number) => {
      const row = [];

      for (let i = 1; i < columnsNumber; i++) {
         row.push(
            <td key={i}>
               <TableInput rowNumber={rowNumber} columnNumber={i} tableName="months" />
            </td>
         );
      }

      return row;
   };

   const renderRows = (rowNames: string[], columnsNumber: number) => {
      return rowNames.map((rowName, i) => (
         <tr key={i}>
            <td>{rowName}</td>
            {renderRow(i, columnsNumber)}
         </tr>
      ));
   };

   const renderTable = (rowNames: string[], columnNames: string[]) => {
      return (
         <table className="table">
            <thead>
               <tr>
                  {columnNames.map((name, i) => (
                     <th key={i}>{name}</th>
                  ))}
               </tr>
            </thead>
            <tbody>{renderRows(rowNames, columnNames.length)}</tbody>
         </table>
      );
   };

   return <>{renderTable(months, header)}</>;
};

export default MounthTable;
