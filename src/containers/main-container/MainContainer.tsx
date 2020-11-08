import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import PageNotFoundComponent from "../../components/PageNotFoundComponent";
import ProductsContainer from "../products-container/ProductsContainer";
import mainClasses from "./MainContainer.module.css";
import indexclasses from "../../index.module.css";
import { getCategoriesMap } from "../../utils/CommonHelper";

class MainContainer extends Component {
  state = {
    name: "React",
  };

  openSideBar = () => {
    (document.getElementById("mySidebar") as HTMLElement).style.display =
      "block";
    (document.getElementById("navOverlay") as HTMLElement).style.display =
      "block";
  };
  closeSideBar = () => {
    (document.getElementById("mySidebar") as HTMLElement).style.display =
      "none";
    (document.getElementById("navOverlay") as HTMLElement).style.display =
      "none";
  };
  onNavLinkClick = (event: any) => {
    this.closeSideBar();
  };
  render() {
    const categories = getCategoriesMap().map((category) => {
      return (
        <NavLink
          key={"NavLink" + category.key}
          to={"/items/" + category.key}
          onClick={this.onNavLinkClick}
          className={mainClasses.styleBarItem}
          activeClassName={mainClasses.active}
        >
          {category.value}
        </NavLink>
      );
    });
    return (
      <div className={mainClasses.bodyWrapper}>
        {/* <!-- Sidebar/menu --> */}
        <nav
          className={[mainClasses.styleSidebar, mainClasses.styleBarBlock].join(
            " "
          )}
          id="mySidebar"
        >
          <div
            className={[
              indexclasses.responsiveContainer,
              indexclasses.positionDisplayContainer,
              indexclasses.paddingTopBottom16,
            ].join(" ")}
          >
            <button
              onClick={this.closeSideBar}
              className={[
                indexclasses.displayNoneOnLarge,
                indexclasses.styleButton,
                indexclasses.positionDisplayTopright,
              ].join(" ")}
            >
              x
            </button>
            <div className={indexclasses.letterSpacing4}>
              <b>
                <img
                  alt="Logo"
                  src="https://res.cloudinary.com/imagesforwebpage/image/upload/v1604768585/WS_r65ahh.png"
                  className={mainClasses.imgLogo}
                ></img>
                <br />
                Williams-Sonoma
              </b>
            </div>
          </div>
          <div className={mainClasses.styleSidebarLinkWrapper}>
            <NavLink
              key={"NavLink0"}
              to={"/all"}
              onClick={this.onNavLinkClick}
              className={mainClasses.styleBarItem}
              activeClassName={mainClasses.active}
            >
              All Products
            </NavLink>
            {categories}
          </div>
        </nav>
        {/* <!-- Top menu on small screens --> */}
        <header
          className={[
            mainClasses.styleBar,
            indexclasses.positionTop,
            indexclasses.displayNoneOnLarge,
            indexclasses.styleBlack,
            indexclasses.fontSize24,
          ].join(" ")}
        >
          <div className={[mainClasses.styleBarItem].join(" ")}>
            <i onClick={this.openSideBar} className="fas fa-bars"></i>
          </div>
          <div
            className={[
              mainClasses.imgLogoWrapper,
              mainClasses.styleBarItem,
              indexclasses.letterSpacing4,
            ].join(" ")}
          >
            {" "}
            WS
          </div>
          <a
            className={[
              mainClasses.styleBarIcons,
              indexclasses.positionRight,
            ].join(" ")}
          >
            <i className="fas fa-shopping-cart"></i>
          </a>
        </header>
        {/* // <!-- Overlay effect when opening sidebar on small screens --> */}
        <div
          className={[
            indexclasses.positionOverlay,
            indexclasses.cursorPointer,
          ].join(" ")}
          onClick={this.closeSideBar}
          id="navOverlay"
        ></div>
        {/* <div className={[indexclasses.positionOverlay, indexclasses.cursorPointer].join(" ")} onClick={this.closeSideCart} id="cartOverlay"></div> */}

        {/* // <!-- !PAGE CONTENT! --> */}
        <div className={mainClasses.pageContentWrapper}>
          <div
            className={[
              indexclasses.displayNoneOnLarge,
              mainClasses.marginTop83,
            ].join(" ")}
          ></div>
          <header
            className={[
              indexclasses.displayNoneOnSmall,
              indexclasses.responsiveContainer,
              indexclasses.fontSize24,
            ].join(" ")}
          >
            <p className={indexclasses.positionRight}>
              <i className="fas fa-shopping-cart"></i>
            </p>
          </header>

          {/* //   <!-- Image header --> */}
          <div className={[indexclasses.responsiveContainer].join(" ")}>
            <Switch>
              <Route path="/all" exact component={ProductsContainer} />
              <Redirect from="/" to="/all" />
              <Route component={PageNotFoundComponent} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
export default MainContainer;
