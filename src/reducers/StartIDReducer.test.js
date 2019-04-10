import { startID } from '../reducers/startIDReducer'

describe('startID', () => {
	const mockState = 0
	let mockAction;
	it('should return state as a default', () => {
		mockAction = {}
		const results = startID(mockState, mockAction)
		expect(results).toEqual(mockState)
	})

	it('should return an ID when the action.type is START_ID', () => {
		const mockAction = {
			type: 'START_ID',
			id: 10
		}
		const results = startID(mockState, mockAction)
		expect(results).toEqual(mockAction.id)
	})
})