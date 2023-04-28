import { Route, Routes } from "react-router-dom";
import Equipment from "./pages/Equipment";
import FuelConsumption from "./pages/FuelConsumption";

export const Router = () => {
   return (
      <Routes>
         <Route path="/" element={<Equipment />} />
         <Route path="fuelConsumption" element={<FuelConsumption />} />
      </Routes>
   );
};
