import styled from 'styled-components';
import Todo_Type from '../types/todo_types';

type TodoItem = Todo_Type & {
	expanded: boolean;
	handleChange: (
		id: string
	) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
};

const TodoListItem = () => {
	return <Contianer></Contianer>;
};

export default TodoListItem;

const Contianer = styled.div`
	width: 150px;
	height: 100px;
	border-radius: 10px;
	box-shadow: 1px 10px 30px 8px rgba(215, 226, 255, 0.25);
`;
