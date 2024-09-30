import { cleanup, renderHook, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { Stage, useMailStore } from './mail'
import { Attachment } from '../api'
import axios from 'axios'
import { FormFields } from '../component/util'

jest.mock('axios')
jest.mock('./util.ts', () => ({
    ...jest.requireActual('./util.ts'),
    ERROR_TIMEOUT: 20,
}))

describe('functional mail store', () => {
    afterEach(cleanup)

    it('should be initialized with basic stage', () => {
        const { result } = renderHook(() => useMailStore())

        expect(result.current.stage).toEqual(Stage.BASIC)
    })

    it('should reset current stage to BASIC stage', () => {
        useMailStore.setState({ stage: Stage.ATTACHMENT })
        const { result } = renderHook(() => useMailStore())

        act(() => {
            result.current.resetStage()
        })

        expect(result.current.stage).toBe(Stage.BASIC)
    })

    it('should move to next stage and set form data', () => {
        useMailStore.setState({ stage: Stage.ATTACHMENT })
        const { result } = renderHook(() => useMailStore())

        expect(result.current.stage).toBe(Stage.ATTACHMENT)
        expect(result.current.attachments).toHaveLength(0)

        act(() => {
            result.current.nextStage({ attachments: [{ originalname: 'attachment.pdf' }] as Attachment[] })
        })

        expect(result.current.stage).toBe(Stage.SUMMARY)
        expect(result.current.attachments).toHaveLength(1)
    })

    it('should sucessfully send mail', async () => {
        (axios.post as jest.Mock).mockResolvedValue({ status: 200 })
        useMailStore.setState({ stage: Stage.SUMMARY })
        const { result } = renderHook(() => useMailStore())

        expect(result.current.stage).toBe(Stage.SUMMARY)

        act(() => {
            result.current.send({ subject: 'subject' } as FormFields)
        })

        await waitFor(() => {
            expect(result.current.stage).toBe(Stage.SENT)
        })
        expect(result.current.error).toBe('')
    })

    it('should process error from send mail action', async () => {
        (axios.post as jest.Mock).mockRejectedValue(new Error('error message'))
        useMailStore.setState({ stage: Stage.SUMMARY })
        const { result } = renderHook(() => useMailStore())

        expect(result.current.stage).toBe(Stage.SUMMARY)

        act(() => {
            result.current.send({ subject: 'subject' } as FormFields)
        })

        await waitFor(() => {
            expect(result.current.error).toBe('error message')
            expect(result.current.stage).toBe(Stage.SUMMARY)
        })

        await waitFor(() => {
            expect(result.current.error).toBe('')
        })
    })
})

describe('next stage action', () => {
    afterEach(cleanup)
    beforeAll(() => {
        useMailStore.setState({ stage: Stage.BASIC })
    })

    it.each([
        Stage[Stage.DESCRIPTION],
        Stage[Stage.ATTACHMENT],
        Stage[Stage.SUMMARY],
        Stage[Stage.SENT],
        Stage[Stage.SENT],
    ])('should transition to %s stage', (stageLabel) => {
        const { result, result: { current: { nextStage } } } = renderHook(() => useMailStore())
        act(nextStage)

        expect(result.current.stage).toEqual(Stage[stageLabel as unknown as number])
    })
})

describe('previous stage action', () => {
    afterEach(cleanup)
    beforeAll(() => {
        useMailStore.setState({ stage: Stage.SENT })
    })

    it.each([
        Stage[Stage.SUMMARY],
        Stage[Stage.ATTACHMENT],
        Stage[Stage.DESCRIPTION],
        Stage[Stage.BASIC],
        Stage[Stage.BASIC],
    ])('should transition to %s stage', (stageLabel) => {
        const { result, result: { current: { previousStage } } } = renderHook(() => useMailStore())
        act(previousStage)

        expect(result.current.stage).toEqual(Stage[stageLabel as unknown as number])
    })
})
