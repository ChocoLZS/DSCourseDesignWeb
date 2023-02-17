import { getCurrentWeek, getDateTimestamp } from "@app/store/TimeStore";
import { IExamItem } from "@app/typings/exam";

export function mergeSort(arr: Array<IExamItem>): Array<IExamItem> {
    let t: number;
    let temp = new Array<IExamItem>(arr.length), length = 1;
    for (t = 0; Math.pow(2, t) < arr.length; t++, length *= 2) {
        const isEven = t % 2 === 0;
        for (let left = 0; left < arr.length; left += 2 * length) {
            const middle = left + length < arr.length ? left + length : left;
            const right = left + (2 * length) < arr.length ? left + (2 * length) : arr.length;
            merge(isEven ? arr : temp, isEven ? temp : arr, left, middle, right);
        }
    }
    if (t % 2 === 0) {
        return arr;
    }
    return temp;
}
function merge(arr: Array<IExamItem>, temp: Array<IExamItem>, left: number, middle: number, right: number) {
    const leftEnd = middle - 1;
    while (left <= leftEnd && middle < right) {
        if (compareTo(arr[left], arr[middle]) > 0) {
            temp[left + middle - leftEnd - 1] = arr[middle++];
        }
        else {
            temp[left + middle - leftEnd - 1] = arr[left++];
        }
    }
    while (left > leftEnd && middle < right) {
        temp[left + middle - leftEnd - 1] = arr[middle++];
    }
    while (left <= leftEnd && middle >= right) {
        temp[left + middle - leftEnd - 1] = arr[left++];
    }
}

function compareTo(a: IExamItem, b: IExamItem): number {
    let result = 0;
    result = getCurrentWeek(a.date) - getCurrentWeek(b.date);
    if (result == 0) {
        result = (new Date(a.date).getDay() + 6) % 7 - (new Date(b.date).getDay() + 6) % 7
        if (result == 0) {
            result = new Date(a.date).getHours() - new Date(b.date).getHours();
        }
    }
    return result;
}

export function examBinarySearch(arr: Array<IExamItem>, time: number): number {
    const binarySearch = function (arr: Array<IExamItem>, time: number,
        _left: number, _middle: number, _right: number): number {
        let left = _left, middle = _middle, right = _right, temp = 0, cmp = 0;
        if (arr.length == 0) {
            return -1;
        }
        while (left < middle && middle < right) {
            cmp = getDateTimestamp(arr[middle].date) - time;
            temp = middle;
            if (cmp === 0)
                return middle;
            else if (cmp > 0) {
                middle = Math.floor((left + middle) / 2);
                right = temp;
            } else if (cmp < 0) {
                middle = Math.floor((right + middle) / 2);
                left = temp;
            }
        }
        if (getDateTimestamp(arr[left].date) < time && getDateTimestamp(arr[right].date) >= time) {
            return right;
        }
        if (getDateTimestamp(arr[left].date) === time)
            return left;
        return -1;
    }
    return binarySearch(arr, time, 0, Math.floor(arr.length / 2), arr.length - 1);
}