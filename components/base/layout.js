import Head from "next/head";
import React, { useState, useEffect } from "react";
import Menus from "./menus";
import Footer from "./footer";

import Config from "../../config/Globals";

import Router, { useRouter } from "next/router";

import Promote from "../home/promote";

export default function Layout({
  children,
  title,
  description,
  bgColor,
  menuOptions,
  getappMode,
  gettogetherMode,
  getpromoteMode,
}) {
  const [userState, setUserState] = useState(false);

  useEffect(() => {
    const user = Config.getUser();

    if (user && document.cookie) {
      setUserState(true);
    } else {
      setUserState(false);
    }
  }, []);

  const onLogOut = () => {
    Config.logoutUser();
    setUserState(false);
    Router.push("/");
  };

  return (
    <div >
      {bgColor && (
        <style jsx global>{`
          body {
            background-color: ${bgColor};
          }
        `}</style>
      )}

      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <main>
        <Menus
          options={menuOptions}
          userState={userState}
          onLogOut={onLogOut}
        />
        <div className="app-container app-container-root">{children}</div>
        {getappMode && <GetApp />}

        {/* {getpromoteMode && (
          <div className="app-container app-container-root">
            <Promote />
          </div>
        )} */}

        {gettogetherMode && <WorkTogether />}

        <Footer userState={userState} />
      </main>

      <script type="text/javascript" src="/main.js"></script>
      <noscript>
        <a
          href="https://www.livechatinc.com/chat-with/12586482/"
          rel="nofollow"
        >
          Chat with us
        </a>
        , powered by{" "}
        <a
          href="https://www.livechatinc.com/?welcome"
          rel="noopener nofollow"
          target="_blank"
        >
          LiveChat
        </a>
      </noscript>
    </div>
  );
}
