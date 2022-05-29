import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';

import AlertType from '../types/alert_types';

const Alert = (props: { alerts: AlertType[] }) => {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const action = (key: string | number) => (
		<>
			<Button
				onClick={() => {
					closeSnackbar(key);
				}}
				style={{ color: 'white' }}
			>
				확인
			</Button>
		</>
	);

	useEffect(() => {
		props.alerts.forEach((alert) => {
			enqueueSnackbar(alert.msg, {
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'center',
				},
				variant: alert.alertType,
				autoHideDuration: 1500,
				preventDuplicate: true,
				action,
			});
		});
	}, [props.alerts]); // eslint-disable-line

	return <></>;
};

export default Alert;
