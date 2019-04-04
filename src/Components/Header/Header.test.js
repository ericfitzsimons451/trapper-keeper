import React from 'react';
import {shallow} from 'enzyme';
import { Header } from './Header'

describe("Header", () => {
	let wrapper;
	let mockFunc = jest.fn()
	beforeEach(() => {
		wrapper = shallow(<Header/>);
	});


	it.skip("should match the snapshot with all data passed in correctly", () => {
		expect(wrapper).toMatchSnapshot();
    })
})