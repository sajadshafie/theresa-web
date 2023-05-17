import React, { useEffect, useState } from "react";

export default function Home(){
    return(
        <div>
            <section className={style.secOne}>
                <div className={style.box1}>
                    <div className={style.contentBox}>
                    <p>Lorem, ipsum.</p>
                        <div className={style.dot}></div>
                    </div>
                    <div className={style.contentBox}><p>271 people</p>
                        <p>+ 0,7%</p>
                        <span>icons</span>
                    </div>
                    
                </div>
                <div className={style.box2}>
                    <div>
                    <p>Lorem, ipsum.</p>
                    <div className={style.dot}></div>
                    </div>
                    <p>271 people</p>
                    <p>+ 1%</p>
                    <span>icons</span>
                </div>
                <div className={style.box3}>
                    <p>Lorem, ipsum.</p>
                    <div className={style.dot}></div>
                    <p>69 people</p>
                    <p>- 1,7%</p>
                    <span>icons</span>
                </div>
            </section>
        </div>
    )
}