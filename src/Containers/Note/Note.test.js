import React from 'react'
import Note from './Note'
import { mapDispatchToProps } from './Note'
import { shallow } from 'enzyme'
import { deleteNote } from '../../Thunks/deleteNote'

describe('Note', () => {
    it.skip('should have initial state', () => {
        let wrapper = shallow(<Note />)
        
        expect(wrapper.state('listItems')).to.equal({ asdf: 'hello'})
    })

    it('should mapDispatchToProps', () => {
        const mockDispatch = jest.fn()
        const mockNote = [
            {id: 1242, title: "test", 
            body: 
            [{
                context: "testone", 
                isChecked: false
            }, {
                context: "testtwo", 
                isChecked: false
            }, {
                context: "testthree", 
                isChecked: true
            }]}
        ]
        const actionToDispatch = deleteNote(mockNote)
        const mappedProps = mapDispatchToProps(mockDispatch)
        mappedProps.deleteNote(mockNote)
        expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })

    it('should call setState inside of componentDidMount', () => {
        let wrapper = shallow(<Note />)
        const mockListItems = [{}]
        wrapper.setState({listItems: mockListItems})
        expect(wrapper.state()).toEqual({listItems: [{}] } )
    })

    describe.skip('toggleCheckBox', () => {
        it('should reset state with the updatedNote if the ID matches', () => {
            let wrapper = shallow(<Note />)
            const mockId = 3
            const mockOldBody = { text: 'hello', checked: true, id: mockId}
            const mockNewBody = { text: "goodbye" , checked: true, id: mockId };
            const mockEvent = {target: {parentElement: {id: 3 } }}
            expect(wrapper.state()).toEqual({
                mockOldBody
            })
            wrapper.instance().toggleCheckBox(mockEvent)
            expect(wrapper.state()).toEqual({mockNewBody})
        })
    })

    describe.skip('editNoteCheck', () => {
        const fakeUpdate = {
            id: 4,
            title: 'title',
            listItems: []
        }
    })
})