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
        this.pointer = document.createElement("span");
        this.pointer.id = "pointer";
        this.drawer = document.createElement("div");
        this.drawer.id = "drawer";
        this.shadow.appendChild(style `
            #pointer{
                display:none;
            }
            #drawer > * {
                color: red;
                text-shadow: 0 0 0.05em white;
                transition: color 1s;
                font-size: 5em;
                font-family: caraoke-custom-font, "Source Han Serif";
                font-weight: 900;
            }
            #drawer > #pointer ~ * {
                color: white;
                text-shadow: 0 0 0.05em grey;
            }
        `);
        this.shadow.appendChild(this.drawer);
    }
    setNode(node) {
        let point = 0;
        "content" in node && (point = this.lyricNodes.nodes.findIndex(p => p === node));
        this._setNode(point);
        return this;
    }
    _setNode(point) {
        this.drawer.insertBefore(this.pointer, this.shadow.getElementById("node_" + (point + 1)));
    }
    setLyric(lyric) {
        "nodes" in lyric && (this.lyricNodes = lyric);
        this._setLyric();
        return this;
    }
    _setLyric() {
        this.drawer.innerHTML = ((lyricNodes => {
            let domstring = "";
            for (let i = lyricNodes.length - 1; i >= 0; i--) {
                domstring = `<span id="node_${i}">${lyricNodes[i].content}</span>` + domstring;
            }
            return domstring;
        })(this.lyricNodes.nodes));
        this.drawer.insertBefore(this.pointer, this.shadow.getElementById("node_0"));
    }
}
function style(styleText, ...other) {
    let el = document.createElement("style");
    el.innerHTML = String.raw(styleText, ...other);
    return el;
}
