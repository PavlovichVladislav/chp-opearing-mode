import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
   return (
      <div className="container_header">
         <header className="header">
            <div className="container">
               <div className="header__wrapper">
                  <div className="header__btns">
                     <Link className="link" to={'/'}>Опт. состав оборудования</Link>
                     <Link className="link" to={'fuelConsumption'}>ХОП</Link>
                     <a href="#" className="link">Предельные издержки</a>
                     <a href="#" className="link">Предельные доходы станции</a>
                     <a href="#" className="link">Опт. электрические мощности</a>
                  </div>
               </div>
            </div>
         </header>
      </div>
   );
};

export default Header;
