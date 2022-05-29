import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { v4 } from 'uuid';
import DialogTitle from '@mui/material/DialogTitle';

import Button from '@mui/material/Button';
import { forwardRef, useCallback, useState } from 'react';
import Chip from '@mui/material/Chip';
import Todo_Type from '../types/todo_types';
import { PRIORITY_ENUM, STATUS_ENUM } from '../enums/todo_enums';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import { IconButton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
type CreateTodo_Type = {
	open: boolean;
	handleClose: () => void;
	addTodo: (todo: Todo_Type) => void;
};

interface CustomDatePicker {
	props: {
		value?: Date | null | undefined;
		onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	};
	ref:
		| null
		| undefined
		| React.RefObject<HTMLButtonElement>
		| ((instance: HTMLButtonElement | null) => void);
}

const CreateTodoDialog = ({ open, handleClose, addTodo }: CreateTodo_Type) => {
	const initialValaue = {
		title: '',
		content: '',
		date: undefined,
		priority: PRIORITY_ENUM.MIDDLE,
		status: STATUS_ENUM.ACTIVATE,
	};
	const [todo, setTodo] = useState<
		Omit<Todo_Type, 'created_at' | 'modified_at' | 'id' | 'tags'>
	>({
		title: '',
		content: '',
		date: undefined,
		priority: PRIORITY_ENUM.MIDDLE,
		status: STATUS_ENUM.ACTIVATE,
	});
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState<string>('');
	const ExampleCustomInput = forwardRef(
		(
			{ value, onClick }: CustomDatePicker['props'],
			ref: CustomDatePicker['ref']
		) => {
			return (
				<Button ref={ref} onClick={onClick} variant="contained">
					{value ? value.toString() : '날짜 지정'}
				</Button>
			);
		}
	);
	const removeTag = (event: string) => {
		setTags((tags) => tags.filter((t) => t !== event));
	};
	const [isOpen, setIsOpen] = useState(false);
	const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTagInput(e.currentTarget.value);
	};
	const addTags = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key == 'Enter' && tagInput != '' && !tags.includes(tagInput)) {
				setTagInput('');

				setTags((ta) => [...ta, tagInput]);
			}
		},
		[tagInput]
	);
	const onChangeTodoInputs = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const id = event.currentTarget.id;
		const value = event.currentTarget.value;

		setTodo((todo) => ({ ...todo, [id]: value }));
	};
	const onChangeDate = (
		date: Date | null,
		event: React.SyntheticEvent<any, Event>
	): void => {
		if (!date) return;
		setTodo((todo) => ({ ...todo, date }));
	};

	const onClickPriority = (e: React.MouseEvent<HTMLButtonElement>) => {
		const priority = parseInt(e.currentTarget.id) as PRIORITY_ENUM;
		setTodo((todo) => ({ ...todo, priority: priority }));
	};

	const onSave = () => {
		if (!todo.title) {
			return;
		}

		addTodo({
			id: v4(),
			...todo,
			tags,
			created_at: new Date(),
			modified_at: new Date(),
		});
		setTagInput('');
		setTags([]);
		setTodo(initialValaue);
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>할 일 작성하기</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="title"
					label="제목"
					type="title"
					fullWidth
					onChange={onChangeTodoInputs}
				/>
				<TextField
					margin="dense"
					id="content-multiline"
					label="내용"
					multiline
					fullWidth
					maxRows={6}
					onChange={onChangeTodoInputs}
				/>
				<TextField
					margin="dense"
					id="title"
					label="태그"
					type="title"
					fullWidth
					helperText="태그를 입력한후 엔터(↵)를 눌러주세요"
					onChange={onChangeTag}
					onKeyDown={addTags}
				/>
				{tags.map((tag, i) => (
					<Chip
						label={tag}
						id={tag}
						className="tag_chip"
						onDelete={() => removeTag(tag)}
					/>
				))}
				<PriorityContainer>
					<Button
						onClick={onClickPriority}
						id={`${PRIORITY_ENUM.TOP}`}
						variant={
							todo.priority === PRIORITY_ENUM.TOP ? 'contained' : 'outlined'
						}
					>
						1순위
					</Button>
					<Button
						onClick={onClickPriority}
						id={`${PRIORITY_ENUM.MIDDLE}`}
						variant={
							todo.priority === PRIORITY_ENUM.MIDDLE ? 'contained' : 'outlined'
						}
					>
						2순위
					</Button>
					<Button
						onClick={onClickPriority}
						id={`${PRIORITY_ENUM.BOTTOM}`}
						variant={
							todo.priority === PRIORITY_ENUM.BOTTOM ? 'contained' : 'outlined'
						}
					>
						3순위
					</Button>
					<Button
						onClick={onClickPriority}
						id={`${PRIORITY_ENUM.EMERGENCY}`}
						variant={
							todo.priority === PRIORITY_ENUM.EMERGENCY
								? 'contained'
								: 'outlined'
						}
					>
						긴급
					</Button>
				</PriorityContainer>
				{/* <Button className="example-custom-input" onClick={handleClick}>
					{todo.date ? todo.date.toString() : '날짜 지정하기'}
				</Button>
				{isOpen && (
					<DatePicker selected={todo.date} onChange={handleChange} inline />
				)} */}
				<div className="date_picker_box">
					<DatePicker
						selected={todo.date}
						onChange={onChangeDate}
						minDate={new Date()}
						customInput={<ExampleCustomInput />}
					/>
					{todo.date && (
						<IconButton
							size="small"
							onClick={() => setTodo((todo) => ({ ...todo, date: undefined }))}
						>
							<CancelIcon />
						</IconButton>
					)}
				</div>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={handleClose}>
					취소
				</Button>
				<Button variant="contained" onClick={onSave}>
					생성
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateTodoDialog;

const DialogContent = styled.div`
	padding: 10px 40px;
	#content-multiline {
		max-height: 140px;
	}
	.tag_chip {
		margin-right: 5px;
	}
	.date_picker_box {
		display: flex;
		justify-content: start;
		& > div {
			width: fit-content;
		}
	}
`;

const PriorityContainer = styled.div`
	margin: 10px 0px;
	button {
		margin-right: 10px;
	}
`;
