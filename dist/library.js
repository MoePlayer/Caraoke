export function checkIfTimePointIsOfTheObject(time, obj) {
    let afterStart;
    let beforeEnd;
    if ("nodes" in obj)
        afterStart = obj.start <= time
            , beforeEnd = obj.end > time;
    else
        afterStart = obj.item.start + obj.node.start <= time
            , beforeEnd = obj.item.start + obj.node.end > time;
    return afterStart && beforeEnd && 0
        || !beforeEnd && 1
        || !afterStart && -1;
}
export function findPercentage(node, item, time) {
    return (time - item.start - node.start) / (node.end - node.start);
}
export function DivisionSearch(checker, arr) {
    if (arr.length === 0)
        return null;
    let startPoint = 0;
    let endPoint = arr.length - 1;
    let center = Math.floor(startPoint + (endPoint - startPoint) / 2);
    let res = checker(arr[center]);
    while (startPoint <= endPoint) {
        if ((res = checker(arr[center])) == 0) {
            return arr[center];
        }
        else
            (res === -1)
                ? (endPoint = center - 1)
                : (startPoint = center + 1);
        center = Math.floor(startPoint + (endPoint - startPoint) / 2);
    }
    return null;
}
