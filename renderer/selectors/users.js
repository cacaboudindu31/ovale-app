import { createSelector } from 'reselect'

export const mapStateToProps = (state) => {
	return {
		message: state.userReducer.message,
		user: state.userReducer.user,
		step: state.userReducer.step,
	}
}