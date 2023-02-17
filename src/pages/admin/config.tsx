import { getCurrentWeekdayToString } from "@app/store/TimeStore";
import { OptionProps } from "@douyinfe/semi-ui/lib/es/select";

export const optionList = (belowLimit: number): OptionProps[] => {
    let lists = [] as OptionProps[];
    for (let i = belowLimit; i <= 14; i++) {
        let obj = {
            value: i,
            label: "第" + i + "节"
        } as OptionProps
        lists.push(obj);
    }
    return lists;
}
export const weekOptionList = (): OptionProps[] => {
    let lists = [] as OptionProps[];
    for (let i = 1; i <= 7; i++) {
        let obj = {
            value: i,
            label: getCurrentWeekdayToString(i)
        } as OptionProps
        lists.push(obj);
    }
    return lists;
}