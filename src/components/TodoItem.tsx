import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Todo_Type from '../types/todo_types';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { PRIORITY_ENUM } from '../enums/todo_enums';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import { Divider } from '@mui/material';
import styled from 'styled-components';

type TodoItem = Todo_Type & {
	expanded: boolean;
	handleExpanded: (
		id: string
	) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
	handleModify: (
		todo: Todo_Type
	) => (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const TodoItem = ({
	id,
	title,
	content,
	priority,
	status,
	tags,
	date,
	created_at,
	modified_at,
	expanded,
	handleExpanded,
	handleModify,
}: TodoItem) => (
	<Accordion
		expanded={expanded}
		onChange={handleExpanded(id)}
		style={{ position: 'relative' }}
	>
		<AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
			<Typography sx={{ width: '33%', flexShrink: 0 }}>{title}</Typography>
			<Typography sx={{ color: 'text.secondary' }}>
				{tags.map((t) => (
					<>
						<Chip label={t} />
						&nbsp;
					</>
				))}
			</Typography>
			<SummaryActions>
				<IconButton
					onClick={handleModify({
						id,
						title,
						content,
						priority,
						status,
						tags,
						date,
						created_at,
						modified_at,
					})}
					size="small"
				>
					<EditIcon />
				</IconButton>
			</SummaryActions>
		</AccordionSummary>
		<Divider />
		<AccordionDetails>
			{content && <Typography gutterBottom> {content}</Typography>}
			우선순위 :{' '}
			<Button
				color={'primary'}
				id={`${PRIORITY_ENUM.BOTTOM}`}
				variant={'contained'}
			>
				3순위
			</Button>
			<br />
			<br />
			{tags && tags.length > 0 && (
				<Typography gutterBottom sx={{ color: 'text.secondary' }}>
					태그 :{' '}
					{tags.map((t) => (
						<>
							<Chip label={t} />
							&nbsp;
						</>
					))}
				</Typography>
			)}
			<Typography gutterBottom variant="caption">
				<>
					생성일: {created_at.toString()}&nbsp;&nbsp; 수정일 :{' '}
					{modified_at.toString()}
				</>
			</Typography>
		</AccordionDetails>
	</Accordion>
);

export default TodoItem;

const SummaryActions = styled.div`
	position: absolute;
	right: 10px;
	top: 7px;
`;
