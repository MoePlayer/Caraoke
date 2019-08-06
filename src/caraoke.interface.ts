export interface Option {
    audio: HTMLMediaElement;
    container: HTMLElement;
    lyric?: LyricItem[];
}

export interface LyricItem {
    nodes: LyricNode[];
    /** start: absolute to the timeSetter */
    start: number;
    /** end: absolute to the timeSetter */
    end: number;
}
export interface LyricNode {
    content: string;
    /** start: relative to `LyricItem` */
    start: number;
    /** end: relative to `LyricItem` */
    end: number;
}