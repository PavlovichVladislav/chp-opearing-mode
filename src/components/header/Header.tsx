import React from "react";

const Header = () => {
   return (
      <div className="container_header">
         <header className="header">
            <div className="container">
               <div className="header__wrapper">
                  <div className="header__btns">
                     <a href="#" className="link active">Опт. состав оборудования</a>
                     <a href="#" className="link">ХОП</a>
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
