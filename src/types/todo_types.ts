import { PRIORITY_ENUM, STATUS_ENUM } from '../enums/todo_enums';

export default interface Todo_Type {
	id: string;
	title: string;
	content?: string;
	tags: string[];
	date?: Date;
	priority: PRIORITY_ENUM;
	status: STATUS_ENUM;
	created_at: Date;
	modified_at: Date;
}
