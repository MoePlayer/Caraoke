export interface Option {
    container: HTMLElement;
    lyric?: LyricItem[];
}
export interface LyricItem {
    nodes: LyricNode[];
    start: number;
    end: number;
}
export interface LyricNode {
    content: string;
    start: number;
    end: number;
}
