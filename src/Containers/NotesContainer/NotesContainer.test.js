import React from 'react'
import { NotesContainer } from './NotesContainer'
import { mapStateToProps, mapDispatchToProps } from './NotesContainer'
import { fetchAllNotes } from '../../Thunks/fetchAllNotes'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
jest.mock('../../Thunks/fetchAllNotes')

describe('NotesContainer', () => {
   
    let wrapper

    it.skip('should render', () => {
        let component = shallow(<NotesContainer />)
        const tree = toJson(component)
        expect(tree).toMatchSnapshot()
    })

    describe('mapStateToProps', () => {
        it('should mapStateToProps', () => {
            const mockState = {
                notes: [{}, {}],
                errorMsg: 'Error message',
                isLoading: false
            }
            const mappedProps = mapStateToProps(mockState)
            expect(mappedProps).toEqual(mockState)
        })
        
    })
    
    describe('mapDispatchToProps', () => {
        it('calls dispatch with the correct action', async () => {
            const mockUrl = 'www.url.com'
            const mockDispatch = jest.fn()
            const actionToDispatch = await fetchAllNotes(mockUrl)
            const mappedProps = mapDispatchToProps(mockDispatch)
            mappedProps.fetchAllNotes(mockUrl)
            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
        })
    })

    describe.skip('componentDidMount', () => {
        it('should call fetchAllNotes with the correct url', async () => {
            await wrapper.instance().componentDidMount()
            expect(fetchAllNotes).toHaveBeenCalledWith("http://localhost:3000/api/v1/notes")
        })
    })
})