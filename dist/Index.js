'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var i=class{target;menuItems;mode;targetNode;menuItemsNode;isOpened;constructor({target:e,menuItems:t,mode:n="dark"}){this.target=e,this.menuItems=t,this.mode=n,this.targetNode=this.getTargetNode(),this.menuItemsNode=this.getMenuItemsNode(),this.isOpened=!1;}getTargetNode(){let e=document.querySelectorAll(this.target);return e.length!==0?e:(console.error(`getTargetNode :: "${this.target}" target not found`),document.querySelectorAll(""))}getMenuItemsNode(){let e=[];return this.menuItems?(this.menuItems.forEach((t,n)=>{let o=this.createItemMarkup(t);o.firstChild?.setAttribute("style",`animation-delay: ${n*.08}s`),e.push(o);}),e):(console.error("getMenuItemsNode :: Please enter menu items"),e)}createItemMarkup(e){let t=document.createElement("BUTTON"),n=document.createElement("LI");return t.innerHTML=e.content,t.classList.add("contextMenu-button"),n.classList.add("contextMenu-item"),e.divider&&n.setAttribute("data-divider",e.divider),n.appendChild(t),e.events&&Object.entries(e.events).forEach(([o,r])=>{t.addEventListener(o,r);}),n}renderMenu(){let e=document.createElement("UL");return e.classList.add("contextMenu"),e.setAttribute("data-theme",this.mode),this.menuItemsNode.forEach(t=>e.appendChild(t)),e}closeMenu(e){this.isOpened&&(this.isOpened=!1,e.remove());}init(){let e=this.renderMenu();document.addEventListener("click",()=>this.closeMenu(e)),window.addEventListener("blur",()=>this.closeMenu(e)),document.addEventListener("contextmenu",t=>{this.targetNode.forEach(n=>{(!t.target||!n.contains(t.target))&&e.remove();});}),this.targetNode.forEach(t=>{t.addEventListener("contextmenu",n=>{n.preventDefault(),this.isOpened=!0;let{clientX:o,clientY:r}=n;document.body.appendChild(e);let a=r+e.scrollHeight>=window.innerHeight?window.innerHeight-e.scrollHeight-20:r,d=o+e.scrollWidth>=window.innerWidth?window.innerWidth-e.scrollWidth-20:o;e.setAttribute("style",`--width: ${e.scrollWidth}px;
           --height: ${e.scrollHeight}px;
           --top: ${a}px;
           --left: ${d}px;`);});});}};var l=`@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
 * {
	 box-sizing: border-box;
	 font-family: "Inter", sans-serif;
}
 html, body {
	 width: 100%;
	 height: 100%;
	 overflow: hidden;
}
 .target {
	 width: 50%;
	 height: 100%;
	 position: absolute;
	 top: 0;
	 z-index: 1;
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 color: rgba(255, 255, 255, 0.5);
	 font-size: 2vw;
}
 .target-light {
	 left: 0;
}
 .target-dark {
	 right: 0;
}
 body {
	 width: 100%;
	 height: 100%;
	 background-color: #000;
	 overflow: hidden;
}
 .right-click {
	 position: absolute;
	 top: 50%;
	 left: 50%;
	 transform: translate(-50%, -50%);
	 z-index: 2;
	 pointer-events: none;
	 padding: 2vw;
	 border-radius: 1vw;
	 font-size: 2.4vw;
	 background-color: #fff;
}
/* Context Menu */
 .contextMenu {
	 --menu-border: rgba(255, 255, 255, 0.08);
	 --menu-bg: linear-gradient(45deg, rgba(10, 20, 28, 0.2) 0%, rgba(10, 20, 28, 0.7) 100%);
	 --item-border: rgba(255, 255, 255, 0.1);
	 --item-color: #fff;
	 --item-bg-hover: rgba(255, 255, 255, 0.1);
	 height: 0;
	 overflow: hidden;
	 background: var(--menu-bg);
	 backdrop-filter: blur(5px);
	 position: fixed;
	 top: var(--top);
	 left: var(--left);
	 animation: menuAnimation 0.4s 0s both;
	 transform-origin: left;
	 list-style: none;
	 margin: 4px;
	 padding: 0;
	 display: flex;
	 flex-direction: column;
	 z-index: 999999999;
	 box-shadow: 0 0 0 1px var(--menu-border), 0 2px 2px #000, 0 4px 4px #000, 0 10px 8px #000, 0 15px 15px #000, 0 30px 30px #000, 0 70px 65px #000;
}
 .contextMenu-item {
	 padding: 4px;
}
 .contextMenu-item[data-divider="top"] {
	 border-top: 1px solid;
}
 .contextMenu-item[data-divider="bottom"] {
	 border-bottom: 1px solid;
}
 .contextMenu-item[data-divider="top-bottom"] {
	 border-top: 1px solid;
	 border-bottom: 1px solid;
}
 .contextMenu-item[data-divider] {
	 border-color: var(--item-border);
}
 .contextMenu-button {
	 color: var(--item-color);
	 background: 0;
	 border: 0;
	 white-space: nowrap;
	 width: 100%;
	 border-radius: 4px;
	 padding: 6px 24px 6px 7px;
	 text-align: left;
	 display: flex;
	 align-items: center;
	 font-size: 14px;
	 width: 100%;
	 animation: menuItemAnimation 0.2s 0s both;
	 font-family: "Inter", sans-serif;
	 cursor: pointer;
}
 .contextMenu-button:hover {
	 background-color: var(--item-bg-hover);
}
 .contextMenu[data-theme="light"] {
	 --menu-bg: linear-gradient(45deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.85) 100%);
	 --menu-border: rgba(0, 0, 0, 0.08);
	 --item-border: rgba(0, 0, 0, 0.1);
	 --item-color: #0a141c;
	 --item-bg-hover: rgba(10, 20, 28, 0.09);
}
 @keyframes menuAnimation {
	 0% {
		 opacity: 0;
		 transform: scale(0.5);
	}
	 100% {
		 height: var(--height);
		 opacity: 1;
		 border-radius: 8px;
		 transform: scale(1);
	}
}
 @keyframes menuItemAnimation {
	 0% {
		 opacity: 0;
		 transform: translateX(-10px);
	}
	 100% {
		 opacity: 1;
		 transform: translateX(0);
	}
}
 
`,c=()=>{if(typeof document<"u"){let s=document.createElement("style");s.textContent=l,document.head.appendChild(s);}};c();var g=i;

exports.ContextMenu = i;
exports.default = g;
//# sourceMappingURL=Index.js.map
//# sourceMappingURL=Index.js.map