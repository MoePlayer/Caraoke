import { checkIfTimePointIsOfTheObject, DivisionSearch } from "./library.js";
import CaraokeView from "./view.js";
export default class Caraoke {
    constructor(defaultOptions) {
        defaultOptions.lyric && (this.lyric = defaultOptions.lyric);
        this.container = defaultOptions.container;
        CaraokeView.install();
        this.view = new CaraokeView;
        this.container.appendChild(this.view);
        this.now = { item: null, node: null };
    }
    setLyric(lyric) {
        "push" in lyric && (this.lyric = lyric);
        return this;
    }
    render(time) {
        time *= 1000;
        let FoundLyricItem = DivisionSearch((el) => checkIfTimePointIsOfTheObject(time, el), this.lyric);
        if (FoundLyricItem !== this.now.item && FoundLyricItem) {
            this.now.item = FoundLyricItem;
            this.view.setLyric(FoundLyricItem);
        }
        let FoundLyricNode;
        if (this.now.item)
            FoundLyricNode = DivisionSearch((el) => checkIfTimePointIsOfTheObject(time, { node: el, item: this.now.item }), this.now.item.nodes);
        if (FoundLyricNode !== this.now.node && FoundLyricNode) {
            this.now.node = FoundLyricNode;
            this.view.setNode(FoundLyricNode);
        }
    }
}
