import { LyricItem, LyricNode } from "./caraoke.interface.js";
export default class CaraokeView extends HTMLElement {
    private lyricNodes;
    private shadow;
    private drawer;
    private pointer;
    static install(): void;
    constructor();
    setNode(node: LyricNode): this;
    private _setNode;
    setLyric(lyric: LyricItem): this;
    private _setLyric;
}
