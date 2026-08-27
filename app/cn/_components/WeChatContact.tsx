"use client";

import {useState} from "react";
import {chinaMarketConfig} from "../../../lib/chinaMarketConfig";
import styles from "./WeChatContact.module.css";

export default function WeChatContact({compact=false}:{compact?:boolean}){
  const [copied,setCopied]=useState(false);

  async function copyId(){
    const text=chinaMarketConfig.wechatId;
    try{
      if(navigator.clipboard?.writeText){
        await navigator.clipboard.writeText(text);
      }else{
        const el=document.createElement("textarea");
        el.value=text;
        el.style.position="fixed";
        el.style.opacity="0";
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      window.setTimeout(()=>setCopied(false),2200);
    }catch{
      window.prompt("复制这个微信号 / Copy WeChat ID:",text);
    }
  }

  return <div className={`${styles.box} ${compact?styles.compact:""}`}>
    <div className={styles.idRow}>
      <span>微信号 · WeChat ID</span>
      <strong>{chinaMarketConfig.wechatId}</strong>
    </div>
    <div className={styles.buttons}>
      <button type="button" onClick={copyId}>
        {copied?"✓ 已复制 GovietStation":"复制微信号 · Copy ID"}
      </button>
      <a href={chinaMarketConfig.wechatOpen}>打开微信 · Open WeChat</a>
    </div>
    <p>最稳的方法：复制 <b>{chinaMarketConfig.wechatId}</b> → 打开微信 → 搜索微信号 → 添加好友。</p>
  </div>
}
