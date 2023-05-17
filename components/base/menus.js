import styles from "../../styles/Menus.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import Config from "../../config/Globals";

export default function Menus({ options, userState, onLogOut }) {
  const [toggle, setToggle] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [helpMenu, setHelpMenu] = useState(false);

  const [mobileMenuMode, setMobileMenuMode] = useState(false);

  const router = useRouter();
  // const style = {
  //   color: router.pathname === href ? "red" : "black",
  // };

  // useEffect(() => {
  //   console.log(router.pathname);
  // }, []);

  return (
    <>
      {mobileMenuMode && (
        <style jsx global>{`
          body {
            overflow: hidden;
          }
        `}</style>
      )}

      {mobileMenuMode && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <Link href="/">
              <a title="Plitio Website">
                <img src="/img/logowhite.svg" alt="Plitio Website" />
              </a>
            </Link>

            <img
              onClick={() => setMobileMenuMode(false)}
              src="/img/menuclose.svg"
              alt="Plitio Website"
            />
          </div>
          <div className={styles.mobileMenuContent}>
            <ul>
              <li>
                <Link href="/howworks">
                  <a
                    title="Plitio How it works"
                    className={
                      router.pathname === "/howworks" ? styles.menuActive : {}
                    }
                  >
                    How it works
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  <a
                    title="Plitio Pricing"
                    className={
                      router.pathname === "/pricing" ? styles.menuActive : {}
                    }
                  >
                    Pricing
                  </a>
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  title="Plitio Services"
                  onClick={() => setToggle(!toggle)}
                >
                  <img
                    className={styles.menuArrow}
                    src="/img/arrowupwhite.svg"
                    alt="Plitio Website"
                  />{" "}
                  Services
                </a>

                {toggle && (
                  <ul>
                    <li>
                      <Link href="/customers">
                        <a
                          title="Plitio Services customers"
                          className={
                            router.pathname === "/customers"
                              ? styles.menuActive
                              : {}
                          }
                        >
                          Customers
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/doctors">
                        <a
                          title="Plitio Services doctors"
                          className={
                            router.pathname === "/doctors"
                              ? styles.menuActive
                              : {}
                          }
                        >
                          Doctors
                        </a>
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link href="/help">
                  <a
                    title="Plitio Help"
                    className={
                      router.pathname === "/help" ? styles.menuActive : {}
                    }
                  >
                    Help
                  </a>
                </Link>
              </li>
              {!options.loginMode && !userState && (
                <li>
                  <Link href="/login">
                    <a title="Plitio Sign in">Sign in</a>
                  </Link>
                </li>
              )}
            </ul>

            {userState && (
              <div className="btn-dropdown">
                <button
                  type="button"
                  onClick={() => setUserMenu(!userMenu)}
                  className="btn-primary"
                  title="Plitio Get started"
                >
                  <img src="/img/arrow-w.svg" />
                  My account
                </button>
                {userMenu && (
                  <ul>
                    <li>
                      <Link href="/account/dashboard">
                        <a title="Plitio Dashboard">Dashboard</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/account/settings">
                        <a title="Plitio Settings">Settings</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/account/pastorders">
                        <a title="Plitio Services doctors">Past orders</a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        onClick={onLogOut}
                        className="logout"
                        title="Plitio Services doctors"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            )}
            {!options.loginMode && !userState && (
              <Link href="/signup">
                <a className="btn-primary" title="Plitio Get started">
                  Get started
                </a>
              </Link>
            )}
          </div>
        </div>
      )}

      <header className={`${styles.menuContainer} app-container `}>
        <Link href="/">
          <a title="Plitio Website">
            <img src="/img/logo.svg" alt="Plitio Website" />
          </a>
        </Link>

        <div>
          <ul>
            <li>
              <Link href="/howworks">
                <a
                  title="Plitio How it works"
                  className={
                    router.pathname === "/howworks" ? styles.menuActive : {}
                  }
                >
                  How it works
                </a>
              </Link>
            </li>
            <li>
              <Link href="/pricing">
                <a
                  title="Plitio Pricing"
                  className={
                    router.pathname === "/pricing" ? styles.menuActive : {}
                  }
                >
                  Pricing
                </a>
              </Link>
            </li>
            <li className={styles.dropdownHandle}>
              <a
                href="#"
                title="Plitio Services"
                onClick={() => setToggle(!toggle)}
              >
                <img
                  className={styles.menuArrow}
                  src="/img/arrowDown.svg"
                  alt="Plitio Website"
                />{" "}
                Services
              </a>

              <span className={`${styles.subMenu}  ${styles.subMenuMobile}`}>
                <ul>
                  <li>
                    <Link href="/customers">
                      <a
                        title="Plitio Services customers"
                        className={
                          router.pathname === "/customers"
                            ? styles.menuActive
                            : {}
                        }
                      >
                        Customers
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/doctors">
                      <a
                        title="Plitio Services doctors"
                        className={
                          router.pathname === "/doctors"
                            ? styles.menuActive
                            : {}
                        }
                      >
                        Doctors
                      </a>
                    </Link>
                  </li>
                </ul>
              </span>
              {toggle && null}
            </li>
            <li>
              <Link href="/help">
                <a
                  title="Plitio Help"
                  className={
                    router.pathname === "/help" ? styles.menuActive : {}
                  }
                >
                  Help
                </a>
              </Link>
            </li>
            {!options.loginMode && !userState && (
              <li>
                <Link href="/login">
                  <a title="Plitio Sign in">Sign in</a>
                </Link>
              </li>
            )}
          </ul>
          {userState && (
            <div className="btn-dropdown" style={{ marginRight: 20 }}>
              <button
                type="button"
                onClick={() => setHelpMenu(!helpMenu)}
                className="btn-primary btn-primary-extend"
              >
                <img src="/img/arrowDown.svg" />
                Prescriptions
              </button>
              {helpMenu && (
                <ul>
                  <li>
                    <Link href="/completeprofile/step2">
                      <a title="Plitio Dashboard">Upload prescription</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/transfer/info">
                      <a title="Plitio Settings">Transfer it</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/info">
                      <a title="Plitio Services doctors">Request it</a>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )}
          {userState && (
            <div className="btn-dropdown">
              <button
                type="button"
                onClick={() => setUserMenu(!userMenu)}
                className="btn-primary"
                title="Plitio Get started"
              >
                <img src="/img/arrow-w.svg" />
                My account
              </button>
              {userMenu && (
                <ul>
                  <li>
                    <Link href="/account/dashboard">
                      <a title="Plitio Dashboard">Dashboard</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/settings">
                      <a title="Plitio Settings">Settings</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/account/pastorders">
                      <a title="Plitio Services doctors">Past orders</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={onLogOut}
                      className="logout"
                      title="Plitio Services doctors"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              )}
            </div>
          )}
          {!options.loginMode && !userState && (
            <Link href="/signup">
              <a className="btn-primary" title="Plitio Get started">
                Get started
              </a>
            </Link>
          )}
        </div>
        <div
          onClick={() => setMobileMenuMode(true)}
          className={styles.menuBurger}
        >
          <img src="/img/menu.svg" alt="Plitio Website" />
        </div>
      </header>
    </>
  );
}
Menus.defaultProps = {
  options: {
    loginMode: false,
  },
};
