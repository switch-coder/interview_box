import Fab from '@mui/material/Fab';
import { useEffect, useState } from 'react';
import Todo_Type from './types/todo_types';
import AddIcon from '@mui/icons-material/Add';
import CreateTodo from './components/CreateTodoDialog';
import styled from 'styled-components';
import TodoItem from './components/TodoItem';
import TodoListItem from './components/TodoListITem';
import { Typography } from '@mui/material';

// 기능
// 1. 생성
// - 다이얼로그 생성
// - priority MIDDLE
// 2. 삭제
// - 조회 가능
// - 삭제 후 따로 관리
// 3. 수정
// - 다이얼로그 생성 전 날짜 선택 불가능
// 4. 검색
// - 태그 / 타이틀 검색 가능
// 5. 조회
// 활성화되 todos
// 비활성화된 todos
// 삭제된 todos

// - ㄱ. 우선순위
// - ㄴ. 날짜순
// - ㄷ. 생성일 (오래된순)
// - 페이지 로드시 지난날짜 / 활성화된것 구분
// - date가 오래된 날짜순으로 조회 기본
// - 지난 날짜는 statu - disalbed로 변경

function App() {
	const [todos, setTodos] = useState<Todo_Type[]>([]);
	const [deletedTodos, setDeletedTodos] = useState<Todo_Type[]>([]);
	const [disalbedTodos, setDisalbedTodos] = useState<Todo_Type[]>([]);
	const [expanded, setExpanded] = useState<string | false>(false);
	const [createOpen, setCreateOpen] = useState<boolean>(false);
	const [modifyTodo, setModifyTodo] = useState<Todo_Type | undefined>();

	const handleChange =
		(id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? id : false);
		};

	const addTodo = (todo: Todo_Type) => {
		setTodos((todos) => [todo, ...todos]);
	};

	const handleModify =
		(todo: Todo_Type) => (e: React.MouseEvent<HTMLButtonElement>) => {};

	useEffect(() => {
		console.log('todo :>> ', todos);
	}, [todos]);
	return (
		<Contianer>
			<Typography variant="h5" gutterBottom>
				할 일
			</Typography>
			{todos.map((todo) => (
				<TodoItem
					{...todo}
					expanded={todo.id === expanded}
					handleExpanded={handleChange}
					handleModify={handleModify}
				/>
			))}
			<FloatingBtn
				color="primary"
				aria-label="add"
				onClick={() => setCreateOpen(true)}
			>
				<AddIcon />
			</FloatingBtn>
			<CreateTodo
				addTodo={addTodo}
				open={createOpen}
				handleClose={() => setCreateOpen(false)}
			/>
		</Contianer>
	);
}

export default App;

const Contianer = styled.main`
	padding: 60px 300px 50px;
`;

const FloatingBtn = styled(Fab)({
	position: 'fixed',
	bottom: '50px',
	right: '50px',
});
