import React from "react";

const Header = () => {
   return (
      <div className="container_header">
         <header className="header">
            <div className="container">
               <div className="header__wrapper">
                  <div className="header__btns">
                     <button className="button">Опт. состав оборудования</button>
                     <button className="button">ХОП</button>
                     <button className="button">Предельные издержки</button>
                     <button className="button">Предельные доходы станции</button>
                     <button className="button">Опт. электрические мощности</button>
                  </div>
               </div>
            </div>
         </header>
      </div>
   );
};

export default Header;
