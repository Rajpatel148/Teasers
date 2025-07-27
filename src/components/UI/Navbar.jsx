import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { category } from "../../data/category.data";
import "./Navbar.css";
import navLogo from "../../assets/page-logo.webp";

const Navbar = ({ details_page }) => {
  const navigate = useNavigate();
  const {categoryID} = useParams();
  const [color, setColor] = useState("");

  const [hamburgerBtnClick, setHamburgerBtnCick] = useState(false);

  const navMenuData = [
    category.trending,
    category.tv,
    category.music,
    category.drama,
    category.history,
  ];

  // Navbar color change
  const listenScrollEvent = () => {
    if (window.scrollY > 50) {
      setColor("rgba(0, 0, 0, 0.6)");
    } else {
      setColor("");
    }
  };

  // Scroll Effect
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      setColor(" ");
    };
  }, []);

  // HANDLE click
  const handleCategoryClick = (id) => {
    navigate(`/category/${id}/1`)
  };
  return (
    <div className="nav" style={{ backgroundColor: color }}>
      <img
        src={navLogo}
        alt="NavLogo"
        onClick={() => navigate("/")}
        className="nav_logo"
      />

      {!details_page && (
        <div className="nav_menu">
          {navMenuData.map((cate, i) => {
            if (cate.id === "trending") {
              cate = { ...cate, title: "Trendings" };
            }
            return (
              <p
                key={i}
                style={
                  cate.id === categoryID
                    ? {
                        color: "rgba(255, 255, 255)",
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                      }
                    : {}
                }
                onClick={() =>
                  cate.id != categoryID && handleCategoryClick(cate.id)
                }
              >
                {cate.title}
              </p>
            );
          })}
        </div>
      )}

      {!details_page&&(
        <>
          <div
            className={`nav_hamburger ${
              hamburgerBtnClick && "nav_hamburger_open"
            }`}
            onClick={() => setHamburgerBtnCick((prev) => !prev)}
          >
            <span className="nav_hamburger--top"></span>
            <span className="nav_hamburger--middle"></span>
            <span className="nav_hamburger--bottom"></span>
          </div>

          <div
            className="nav_menu_sm"
            style={
              hamburgerBtnClick ? { top: 0, color: "rgba(255, 255, 255)" } : {}
            }
          >
            {navMenuData.map((cate, i) => {
              if (cate.id === "trending") {
                cate = { ...cate, title: "Trendings" };
              }
              return (
                <p
                  key={i}
                  style={
                    cate.id === categoryID && hamburgerBtnClick
                      ? {
                          color: "rgba(255, 255, 255)",
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                        }
                      : {}
                  }
                  onClick={() =>
                    cate.id !== categoryID && handleCategoryClick(cate.id)
                  }
                >
                  {cate.title}
                </p>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
