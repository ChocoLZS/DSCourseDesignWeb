import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';

import activity from '@mock/activity';
import student from '@mock/student';
import courses from '@mock/courses';
import exam from '@mock/exam';
import material from '@mock/material';
/**
 * Used in a production environment. Need to manually import all modules
 */
export const mockModules = [...activity, ...student, ...courses, ...exam, ...material];
export function setupProdMockServer() {
    createProdMockServer(mockModules);
}
