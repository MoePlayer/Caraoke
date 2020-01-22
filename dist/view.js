let isInstalled = false;
export default class CaraokeView extends HTMLElement {
    static install() {
        if (isInstalled)
            return;
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
        this.shadow.appendChild(style `
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
    setNode(node, percentage) {
        let point = 0;
        "content" in node && (point = this.lyricNodes.nodes.findIndex(p => p === node));
        this._setNode(point, percentage);
        return this;
    }
    _setNode(point, percentage) {
        (point - 1) >= 0 && (this.shadow.getElementById("node_" + (point - 1)).style["clipPath"] = "inset(0 0 0 0)");
        this.shadow.getElementById("node_" + point).style["clipPath"] = "inset(0 " + parseInt((1 - percentage) * 100) + "% 0 0)";
    }
    setLyric(lyric) {
        "nodes" in lyric && (this.lyricNodes = lyric);
        this._setLyric();
        return this;
    }
    _setLyric() {
        [this.drawer.innerHTML, this.backgroundDrawer.innerHTML] = ((lyricNodes => {
            let domstring = "";
            for (let i = lyricNodes.length - 1; i >= 0; i--) {
                domstring = `<span id="node_${i}">${lyricNodes[i].content}</span>` + domstring;
            }
            return [domstring, domstring];
        })(this.lyricNodes.nodes));
    }
}
function style(styleText, ...other) {
    let el = document.createElement("style");
    el.innerHTML = String.raw(styleText, ...other);
    return el;
}
