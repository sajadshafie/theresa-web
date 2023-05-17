import Head from "next/head";
import React, { useState, useEffect } from "react";

export default function rootLayout({
  children,
  title,
  description,
  reverseMode,txtFooter
}) {
  //const [userState, setUserState] = useState(false);

  return (
    <div>
      
      <Head>
        <title>{title}</title>

        <meta name="description" content={description} />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <main
        className={
          reverseMode ? " rootContainer-reverse rootContainer" : "rootContainer"
        }
      >
          {children}
      </main>
      {txtFooter}
    </div>
  );
}
