import { LyricItem, LyricNode } from "./caraoke.interface.js";
export declare function checkIfTimePointIsOfTheObject(time: number, obj: LyricItem | {
    node: LyricNode;
    item: LyricItem;
}): 0 | 1 | -1;
export declare function findPercentage(node: LyricNode, item: LyricItem, time: number): number;
export declare function DivisionSearch<T>(checker: (el: T) => number, arr: T[]): T | null;
