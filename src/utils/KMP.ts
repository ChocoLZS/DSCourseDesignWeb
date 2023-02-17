//计算前缀函数 O(n)
export function KMPpartMatchTable(str: string) {
    var matchTable: number[] = [0];
    var len = str.length;
    for (var i = 1; i < len; ++i) {
        var j = matchTable[i - 1];
        while (j > 0 && str[i] != str[j])
            j = matchTable[j - 1];
            if (str[i] == str[j])
                j++;
            matchTable[i] = j;
    }
    return matchTable;
}

//sourceStr为主串，targetStr为模式串。
export function KMP(sourceStr: string, targetStr: string) {
    var partMatchValue = KMPpartMatchTable(targetStr); //拿到匹配表
    var result = false;
    for (var i = 0; i < sourceStr.length; i++) {
        for (var k = 0; k < targetStr.length; k++) {
            if (targetStr.charAt(k) == sourceStr.charAt(i)) {
                if (k == targetStr.length - 1) {
                    result = true;
                    break;
                } else
                    i++;
            } else {
                if (k > 0 && partMatchValue[k - 1] > 0)
                    k = partMatchValue[k - 1] - 1;
                else
                    break;
            }
        }
        if (result)
            break;
    }
    return result
}