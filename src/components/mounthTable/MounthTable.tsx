import { header, months } from "../../data/moutnTableData";
import TableInput from "../tableCell/TableCell";

const MounthTable = () => {
   const renderRow = (rowNumber: number, columnsNumber: number) => {
      const row = [];

      for (let i = 0; i < columnsNumber - 1; i++) {
         row.push(<TableInput key={i} rowNumber={rowNumber} columnNumber={i} tableName="months" />);
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
