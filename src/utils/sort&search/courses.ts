import { ICourseListItem, ICourseItem, COURSE_KEY } from "@app/typings/course";

function compareToArray(a: ICourseItem, b: ICourseItem, key: number): number {
    switch (key) {
        case COURSE_KEY.ID:
            return a.id.localeCompare(b.id);
        case COURSE_KEY.NAME:
            return a.name.localeCompare(b.name);
        case COURSE_KEY.LOCATION:
            return a.location.localeCompare(b.location);
        case COURSE_KEY.NOTE:
            return a.note.localeCompare(b.note);
        default:
            return 0;
    }

}

//比较两个元素
function compareTo(a: ICourseItem, b: string, key: number): number {
    switch (key) {
        case COURSE_KEY.ID:
            return a.id.localeCompare(b);
        case COURSE_KEY.NAME:
            return a.name.localeCompare(b);
        case COURSE_KEY.LOCATION:
            return a.location.localeCompare(b);
        case COURSE_KEY.NOTE:
            return a.note.localeCompare(b);
        default:
            return 0;
    }
}
export function mergeSort(arr: Array<ICourseItem>, key: number): Array<ICourseItem> {
    let t: number;
    let temp = new Array<ICourseItem>(arr.length), length = 1;
    for (t = 0; Math.pow(2, t) < arr.length; t++, length *= 2) {
        const isEven = t % 2 === 0;
        for (let left = 0; left < arr.length; left += 2 * length) {
            const middle = left + length < arr.length ? left + length : left;
            const right = left + (2 * length) < arr.length ? left + (2 * length) : arr.length;
            merge(isEven ? arr : temp, isEven ? temp : arr, left, middle, right, key);
        }
    }
    if (t % 2 === 0) {
        return arr;
    }
    return temp;
}
function merge(arr: Array<ICourseItem>, temp: Array<ICourseItem>, left: number, middle: number, right: number, key: number) {//将arr排序后赋值给temp
    const leftEnd = middle - 1;
    while (left <= leftEnd && middle < right) {
        if (compareToArray(arr[left], arr[middle], key) > 0) {
            temp[left + middle - leftEnd - 1] = arr[middle++];
        } else {
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

//递归写法
export function binarySearchByKey(arr: Array<ICourseItem>, val: string, key: number): ICourseItem | null {
    let sortedArr = mergeSort(arr, key);
    const binarySearch = function (arr: Array<ICourseItem>, val: string,
        _left: number, _middle: number, _right: number, key: number): ICourseItem | null {
        let left = _left, middle = _middle, right = _right, temp = 0, cmp = 0;
        while (left < middle && middle < right) {
            cmp = compareTo(arr[middle], val, key);
            temp = middle;
            if (cmp === 0)
                return arr[middle];
            else if (cmp > 0) {
                middle = Math.floor((left + middle) / 2);
                right = temp;
            } else if (cmp < 0) {
                middle = Math.floor((right + middle) / 2);
                left = temp;
            }
        }
        if (compareTo(arr[left], val, key) === 0)
            return arr[left];
        if (compareTo(arr[right], val, key) === 0)
            return arr[right];
        return null;
    }
    return binarySearch(sortedArr, val, 0, Math.floor(arr.length / 2), arr.length - 1, key);
}
