import { LyricItem, LyricNode } from "./caraoke.interface.js";
export default class CaraokeView extends HTMLElement {
    private lyricNodes;
    private shadow;
    private drawer;
    private backgroundDrawer;
    static install(): void;
    constructor();
    setNode(node: LyricNode, percentage: number): this;
    private _setNode;
    setLyric(lyric: LyricItem): this;
    private _setLyric;
}
