import { LyricItem, LyricNode } from "./caraoke.interface.js";

let isInstalled = false;
export default class CaraokeView extends HTMLElement {
    private lyricNodes: LyricItem;
    private shadow: ShadowRoot;
    private drawer: HTMLDivElement;
    private backgroundDrawer: HTMLDivElement;
    static install() {
        if (isInstalled) return;
        window.customElements.define("caraoke-view", CaraokeView);
        isInstalled = true;
    }
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "closed" });
        this.drawer = document.createElement("div");
        this.drawer.id = "drawer";
        this.backgroundDrawer = document.createElement("div");
        this.backgroundDrawer.id = "backgroundDrawer";

        this.shadow.appendChild(style`
            #pointer{
                display:none;
            }
            #drawer {
                position: absolute;
            }
            #backgroundDrawer > *, #drawer > * {
                color: red;
                text-shadow: 0 0 0.1em red;
                clip-path: inset(0 100% 0 0);
                font-size: 3em;
                font-family: caraoke-custom-font, "Source Han Serif","STZhongSong","Yu Mincho", serif;
                font-weight: 900;
            }
            #backgroundDrawer > * {
                color: white;
                text-shadow: 0 0 0.1em grey;
                clip-path: none;
            }
        `);
        this.shadow.appendChild(this.drawer);
        this.shadow.appendChild(this.backgroundDrawer);
    }
    public setNode(node: LyricNode, percentage: number) {
        let point = 0;
        "content" in node && (point = this.lyricNodes.nodes.findIndex(p => p === node));
        this._setNode(point, percentage);
        return this;
    }
    private _setNode(point: number, percentage: number) {
        (point-1)>=0&&(this.shadow.getElementById("node_" + (point-1)).style["clipPath"] = "inset(0 0 0 0)");
        this.shadow.getElementById("node_" + point).style["clipPath"] = "inset(0 " + parseInt((1 - percentage) * 100 as any) + "% 0 0)";
    }
    public setLyric(lyric: LyricItem) {
        "nodes" in lyric && (this.lyricNodes = lyric);
        this._setLyric();
        return this;
    }
    /**
     * Refresh the drawer.
     * 
     * pointer,node_0,node_1,...node_another?
     */
    private _setLyric() {
        [this.drawer.innerHTML, this.backgroundDrawer.innerHTML] = ((lyricNodes => {
            let domstring = "";
            for (let i = lyricNodes.length - 1; i >= 0; i--) {
                domstring = `<span id="node_${i}">${lyricNodes[i].content}</span>` + domstring
            }
            return [domstring, domstring];
        })(this.lyricNodes.nodes));
    }
}
function style(styleText: any, ...other: any[]) {
    let el = document.createElement("style");
    el.innerHTML = String.raw(styleText, ...other);
    return el;
}