import create, { SetState, GetState, State } from "zustand";
export interface tagItem {
    id: string,
    path: string,
    text: string,
    closable: boolean,
}
export const createTagStore = <Prefix extends string>(
    prefix: Prefix
) => {
    return (set: SetState<State>, get: GetState<State>) => {
        type PrefixTags = `${Prefix}tags`
        type PrefixActivedTagId = `${Prefix}activedTagId`
        type PrefixCollapsible = `${Prefix}collapsible`
        type PrefixSetActiveTag = `${Prefix}setActiveTag`
        type PrefixAddTag = `${Prefix}addTag`
        type PrefixRemoveTag = `${Prefix}removeTag`
        return {
            [`${prefix}tags`]: [] as Array<tagItem>,
            [`${prefix}activedTagId`]: '' as string,
            [`${prefix}collapsible`]: true as boolean,
            [`${prefix}setActiveTag`]: (id: string) => set({ [`${prefix}activedTagId`]: id }),
            [`${prefix}addTag`]: (tagItem: tagItem) => {
                //@ts-ignore
                const tags = get()[`${prefix}tags`] as Array<tagItem>;
                //@ts-ignore
                const setActiveTag = get()[`${prefix}setActiveTag`];
                const isExist = tags.find(e => e.id === tagItem.id);
                if (!isExist || isExist === undefined) {
                    setActiveTag(tagItem.id);
                    set({ [`${prefix}tags`]: [...tags, tagItem] });
                } else
                    setActiveTag(tagItem.id);
            },
            [`${prefix}removeTag`]: (tagItem: tagItem) => {
                //@ts-ignore
                const tags = get()[`${prefix}tags`] as Array<tagItem>, activedTagId = get()[`${prefix}activedTagId`], setActiveTag = get()[`${prefix}setActiveTag`];
                const tagList = tags.filter(tag => tag.id !== tagItem.id);
                if (tagList.length > 0) {
                    if (activedTagId === tagItem.id) {
                        const index = tags.findIndex(tag => tag.id === tagItem.id);
                        setActiveTag(index === 0 ? tags[index + 1].id : tags[index - 1].id,)
                        set({ [`${prefix}tags`]: tagList })
                    } else
                        set({ [`${prefix}tags`]: tagList });
                }
            }
        } as Record<PrefixTags, Array<tagItem>> &
            Record<PrefixActivedTagId, tagItem["id"]> &
            Record<PrefixCollapsible, boolean> &
            Record<PrefixSetActiveTag, (tagId: string) => void> &
            Record<PrefixAddTag, (tagItem: tagItem) => void> &
            Record<PrefixRemoveTag, (tagItem: tagItem) => void>
    }
}
const navheaderStore = createTagStore("navheader");
const courseheadersStore = createTagStore("course")
export const useNavTagStore = create((set, get) => ({
    //@ts-ignore
    ...navheaderStore(set, get)
}))
export const useCourseInfoTagStore = create((set, get) => ({
    //@ts-ignore
    ...courseheadersStore(set, get)
}))