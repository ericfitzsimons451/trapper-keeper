import React from 'react'
import { Error } from './Error'
import { shallow } from 'enzyme'

describe('Error', () => {
    it('should match the snapshot', () => {
        let wrapper = shallow(<Error />)
        expect(wrapper).toMatchSnapshot()
    })
})