import { COURSE_KEY, ICourseItem } from '@app/typings/course'
import create from 'zustand';
import { getAllCourses } from '@app/api/course';
import { mergeSort } from '@app/utils/sort&search/courses';

interface CoursesState {
    courses: Array<ICourseItem>,
    coursesTable: Array<Array<string>>,
    setCourses: (data: Array<ICourseItem>) => void,
    setCoursesTable: () => void;
}

export const useCourseStore = create<CoursesState>((set, get) => ({
    courses: [] as Array<ICourseItem>,
    coursesTable: Array.from(new Array(8), () => new Array<string>(15)),
    setCourses: (data: Array<ICourseItem>) => {
        set({ courses: data })
        let table = Array.from(new Array(8), () => new Array<string>(15))
        for (let course of data) {
            for (let time of course.time) {
                for (let i = time.start; i <= time.end; i++) {
                    table[time.dow][i] = course.id;
                }
            }
        }
        set({ coursesTable: table });
    },
    setCoursesTable: () => {
        const { courses, coursesTable } = get();
        for (let course of courses) {
            for (let time of course.time) {
                for (let i = time.start; i <= time.end; i++) {
                    coursesTable[time.dow][i] = course.id;
                }
            }
        }
        set({ coursesTable: coursesTable });
    }
}))