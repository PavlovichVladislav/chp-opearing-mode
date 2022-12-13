import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
   setBoilerName,
   setBoilerValue,
   setTableValue,
   setTurbineName,
   setTurbineValue,
} from "../../store/slices/yearTaskSlice";

interface TableInputProps {
   monthNumber: number;
   valueType: number;
   dataType: number;
}

const TableInput: FC<TableInputProps> = ({
   monthNumber,
   valueType,
   dataType,
}) => {
   const [value, setValue] = useState("");
   const dispatch = useDispatch();

   useEffect(() => {
      switch (dataType) {
         case 1: {
            dispatch(
               setTableValue({
                  index: monthNumber,
                  value: Number(value),
                  valueType,
               })
            );
            break;
         }
         case 2: {
            if (valueType === 0 || valueType === 1) {
               dispatch(
                  setTurbineName({
                     index: monthNumber,
                     value: value,
                     valueType,
                  })
               );
               break;
            }

            dispatch(
               setTurbineValue({
                  index: monthNumber,
                  value: Number(value),
                  valueType,
               })
            );
            break;
         }
         case 3: {
            if (valueType === 0 || valueType === 1) {
               dispatch(
                  setBoilerName({
                     index: monthNumber,
                     value: value,
                     valueType,
                  })
               );
               break;
            }

            dispatch(
               setBoilerValue({
                  index: monthNumber,
                  value: Number(value),
                  valueType,
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
