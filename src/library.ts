import { LyricItem, LyricNode } from "./caraoke.interface.js";

/**
 * If the time point is of the object, return `0`;
 * 
 * if the time point is before the object's start, return `-1`;
 * 
 * if the time point is after the object's end, return `1`;
 * 
 * @param time time point, ms. 
 * @param obj `LyricItem` or `{node:LyricNode,item:LyricItem}`
 */
export function checkIfTimePointIsOfTheObject(
    time: number,
    obj: LyricItem | { node: LyricNode, item: LyricItem }
) {
    let afterStart: boolean;
    let beforeEnd: boolean;
    if ("nodes" in obj)
        afterStart = obj.start <= time
            , beforeEnd = obj.end > time
    else
        afterStart = obj.item.start + obj.node.start <= time
            , beforeEnd = obj.item.start + obj.node.end > time;
    return afterStart && beforeEnd && 0
        || !beforeEnd && 1
        || !afterStart && -1;
}

export function DivisionSearch<T>(
    checker: (el: T) => number,
    arr: T[]): T | null {
    if (arr.length === 0) return null;
    let startPoint = 0;
    let endPoint = arr.length - 1;
    let center = Math.floor(startPoint + (endPoint - startPoint) / 2);
    let res = checker(arr[center]);

    while (startPoint <= endPoint) {
        if ((res = checker(arr[center])) == 0) {
            return arr[center]
        } else (res === -1) //if so, time point is before the center
            ? (endPoint = center - 1) //[start,startPoint|center,endPoint|end]
            : (startPoint = center + 1); //[start|center,startPoint|end,endPoint]
        center = Math.floor(startPoint + (endPoint - startPoint) / 2)
    }
    return null;
}