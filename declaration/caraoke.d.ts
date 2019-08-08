import { Option, LyricItem } from "./caraoke.interface.js";
export default class Caraoke {
    private audioNode;
    private container;
    private lyric;
    private view;
    private now;
    constructor(defaultOptions: Option);
    setLyric(lyric: LyricItem[]): this;
    render(time: number): void;
}
