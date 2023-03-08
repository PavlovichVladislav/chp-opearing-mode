import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
   setBoilerName,
   setBoilerValue,
   setMonthsTableValue,
   setTurbineName,
   setTurbineValue,
} from "../../store/slices/yearTaskSlice";

interface TableInputProps {
   rowNumber: number;
   columnNumber: number;
   tableName: string;
}

const TableInput: FC<TableInputProps> = ({
   rowNumber,
   columnNumber,
   tableName,
}) => {
   const [value, setValue] = useState("");
   const dispatch = useDispatch();

   useEffect(() => {
      switch (tableName) {
         case "months": {
            dispatch(
               setMonthsTableValue({
                  rowNumber: rowNumber,
                  value: Number(value),
                  columnNumber,
               })
            );
            break;
         }
         case "turbines": {
            if (columnNumber === 0 || columnNumber === 1) {
               dispatch(
                  setTurbineName({
                     index: rowNumber,
                     value: value,
                     columnNumber,
                  })
               );
               break;
            }

            dispatch(
               setTurbineValue({
                  rowNumber: rowNumber,
                  value: Number(value),
                  columnNumber,
               })
            );
            break;
         }
         case "boilers": {
            if (columnNumber === 0 || columnNumber === 1) {
               dispatch(
                  setBoilerName({
                     index: rowNumber,
                     value: value,
                     columnNumber,
                  })
               );
               break;
            }

            dispatch(
               setBoilerValue({
                  rowNumber: rowNumber,
                  value: Number(value),
                  columnNumber,
               })
            );
            break;
         }
      }
   }, [value]);

   return (
      <input
         value={value}
         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
         }
      />
   );
};

export default TableInput;
