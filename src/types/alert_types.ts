export default interface AlertType {
	id: string;
	msg: string;
	alertType: 'success' | 'error' | 'warning' | 'info' | 'default';
}
