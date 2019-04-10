import { Loader } from './Loader'
import React from 'react'
import { shallow } from 'enzyme'

describe('Loader', () => {
	it('should match the snapshot', () => {
		let wrapper = shallow(<Loader />)
		expect(wrapper).toMatchSnapshot()
	})
})
