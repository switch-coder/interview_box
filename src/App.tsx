import Fab from '@mui/material/Fab';
import { useCallback, useEffect, useState } from 'react';
import Todo_Type from './types/todo_types';
import AddIcon from '@mui/icons-material/Add';
import CreateTodo from './components/CreateTodoDialog';
import styled from 'styled-components';
import TodoItem from './components/TodoItem';
import ModifyTodoDialog from './components/ModifyTodoDialog';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { STATUS_ENUM } from './enums/todo_enums';
import AlertType from './types/alert_types';
import { v4 } from 'uuid';
import Alert from './components/Alerts';
import { SnackbarProvider } from 'notistack';

function App() {
	const [todos, setTodos] = useState<Todo_Type[]>([]);
	const [tags, setTages] = useState<string[]>([]);
	const [deletedTodos, setDeletedTodos] = useState<Todo_Type[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo_Type[]>([]);
	const [expanded, setExpanded] = useState<string | false>(false);
	const [createOpen, setCreateOpen] = useState<boolean>(false);
	const [openModifyDialog, setOpenModifyDialog] = useState<boolean>(false);
	const [modifyTodo, setModifyTodo] = useState<Todo_Type | undefined>();
	const [searchTags, setSearchTags] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [onSearch, setOnSearch] = useState(false);
	const [searchTodos, setSearchTodos] = useState<Todo_Type[]>([]);
	const [alerts, setAlerts] = useState<AlertType[]>([]);

	const handleChange =
		(id: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? id : false);
		};

	const addTodo = (todo: Todo_Type) => {
		setTages((tags) => [...new Set([...tags, ...todo.tags])]);
		setTodos((todos) => [todo, ...todos]);
	};

	const onSaveModifyTodo = (todo: Todo_Type) => {
		setTodos((todos) => todos.map((t) => (t.id === todo.id ? todo : t)));
		handleCloseModifyDialog();
	};

	const handleCloseModifyDialog = () => {
		setOpenModifyDialog(false);
		setModifyTodo(undefined);
	};

	const handleModify = (todo: Todo_Type) => {
		setModifyTodo(todo);
		setOpenModifyDialog(true);
	};

	const handleCompleted = (id: string) => {
		const completedTodo = todos.find((todo) => id === todo.id);
		if (!completedTodo)
			return addAlerts(
				'존재하지 않은 할일 입니다. 다시 시도해주세요',
				'warning'
			);
		completedTodo.deleted_at = new Date();
		completedTodo.status = STATUS_ENUM.COMPELETED;

		setTodos((todos) => todos.filter((todo) => todo.id !== id));
		setCompletedTodos((todos) => [completedTodo, ...todos]);
	};

	const deleteItem = (id: string) => {
		const deleteTodo = todos.find((todo) => id === todo.id);
		if (!deleteTodo)
			return addAlerts(
				'존재하지 않은 할일 입니다. 다시 시도해주세요',
				'warning'
			);
		deleteTodo.deleted_at = new Date();
		deleteTodo.status = STATUS_ENUM.DELETED;
		setTodos((todos) => todos.filter((todo) => todo.id !== id));
		setDeletedTodos((todos) => [deleteTodo, ...todos]);
		addAlerts('삭제되었습니다.', 'success');
	};

	const enterSearch = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key == 'Enter' && searchInput != '') {
				if (searchTags)
					setSearchTodos(
						todos.filter((todo) => todo.tags.includes(searchTags))
					);
				else {
					setSearchTodos(
						todos.filter((todo) => todo.title.includes(searchInput))
					);
				}
				setOnSearch(true);
			}
		},
		[todos, searchInput, searchTags]
	);

	const addAlerts = (
		msg: AlertType['msg'],
		alertType: AlertType['alertType']
	) => {
		const alert: AlertType = {
			alertType,
			id: v4(),
			msg,
		};
		// ReactGa.modalview(msg);
		setAlerts((alerts) => [...alerts, alert]);
		setTimeout(() => {
			setAlerts((state) => state.filter((a) => a.id !== alert.id));
		});
	};
	useEffect(() => {
		if (!searchInput) {
			setSearchTags('');
			setOnSearch(false);
		}
	}, [searchInput]);

	return (
		<Contianer>
			<SnackbarProvider maxSnack={3}>
				<Alert alerts={alerts} />
			</SnackbarProvider>
			<SearchBar>
				<Autocomplete
					freeSolo
					id="search"
					fullWidth
					options={tags}
					clearOnEscape
					clearIcon={<></>}
					inputValue={searchInput}
					onInputChange={(event: any, newinputValue: string) =>
						setSearchInput(newinputValue)
					}
					onChange={(event: any, newValue: string | null) => {
						if (newValue) setSearchTags(newValue);
					}}
					renderInput={(params) => (
						<TextField
							{...params}
							onKeyDown={enterSearch}
							label="검색하기"
							helperText="태그로 검색시 아래 태그중 선택 후 엔터, 제목으로 검색시 검색어 입력후 엔터"
							InputProps={{
								...params.InputProps,
								type: 'search',
							}}
						/>
					)}
				/>
			</SearchBar>
			{onSearch && (
				<>
					<Typography>'{searchInput}'로 검색한 결과 입니다.</Typography>
					{searchTodos.length > 0 ? (
						searchTodos.map((todo) => (
							<TodoItem
								key={todo.id}
								{...todo}
								expanded={todo.id === expanded}
								handleExpanded={handleChange}
								handleModify={handleModify}
								handleCompleted={handleCompleted}
								deleteItem={deleteItem}
							/>
						))
					) : (
						<span>검색 결과가 없습니다. 다른 검색어로 검색해 주세요</span>
					)}
				</>
			)}
			{!onSearch && (
				<>
					<Typography variant="h5" gutterBottom>
						할 일
					</Typography>

					{todos.length > 0 ? (
						todos.map((todo) => (
							<TodoItem
								key={todo.id}
								{...todo}
								expanded={todo.id === expanded}
								handleExpanded={handleChange}
								handleModify={handleModify}
								handleCompleted={handleCompleted}
								deleteItem={deleteItem}
							/>
						))
					) : (
						<span>할 일을 작성해주세요</span>
					)}
				</>
			)}
			<br />
			<br />
			<br />
			{!onSearch && completedTodos && completedTodos.length > 0 && (
				<>
					<Typography variant="h5" gutterBottom>
						완료한 일들
					</Typography>
					{completedTodos.map((todo) => (
						<TodoItem
							key={todo.id}
							{...todo}
							expanded={todo.id === expanded}
							handleExpanded={handleChange}
						/>
					))}
				</>
			)}

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
				addAlert={addAlerts}
			/>
			{modifyTodo && (
				<ModifyTodoDialog
					initialTodo={modifyTodo}
					open={openModifyDialog}
					handleClose={handleCloseModifyDialog}
					onSaveTodo={onSaveModifyTodo}
					addAlert={addAlerts}
				/>
			)}
		</Contianer>
	);
}

export default App;

const Contianer = styled.main`
	padding: 10px 300px 50px;
`;

const FloatingBtn = styled(Fab)({
	position: 'fixed',
	bottom: '50px',
	right: '50px',
});

const SearchBar = styled.div`
	position: sticky;
	z-index: 5;
	background-color: rgba(215, 226, 255, 1);
	top: 0px;
	width: 100%;
	height: 90px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 30px 0px;
	padding: -30px -10px;
`;
