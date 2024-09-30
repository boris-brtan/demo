import { act, cleanup, fireEvent, render, waitFor } from '@testing-library/react'
import { Form } from './Form'
import '@testing-library/jest-dom'

describe('Form component', () => {
    afterEach(cleanup)

    it('should render correctly', async () => {
        render(<Form />)

        expect(document.body).toBeDefined()
    })
})
