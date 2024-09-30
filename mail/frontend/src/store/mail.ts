import { createJSONStorage, persist } from 'zustand/middleware'
import { ERROR_TIMEOUT, create } from './util'
import { FormFields } from '../component/util'
import { send } from '../api'

export enum Stage {
    /**
     * Stage to input subject, receiver and carbon copy.
     */
    BASIC,
    /**
     * Stage to input description.
     */
    DESCRIPTION,
    /**
     * Stage to input attachments like signature and other documents.
     */
    ATTACHMENT,
    /**
     * Stage to review all input data.
     */
    SUMMARY,
    /**
     * Stage after send action.
     */
    SENT,
}

export interface MailStore extends FormFields {
    /**
     * Current stage of mail client.
     */
    stage: Stage
    /**
     * Whether send mail request is still in progress.
     */
    sending: boolean
    /**
     * Error that can emerge from api call.
     */
    error: string
    /**
     * Moves to next stage of mail client.
     */
    nextStage(data?: Partial<FormFields>): void
    /**
     * Moves to previous stage of mail client.
     */
    previousStage(): void
    /**
     * Moves to first stage {@link Stage.BASIC}.
     */
    resetStage(): void
    /**
     * Sends valid form fields.
     */
    send(data: FormFields): void
    /**
     * Shows error for defined time.
     *
     * @param message request error message
     * @param delay time in ms for message to be present (default: 1500)
     */
    showError(message: string, delay?: number): void
}

const name = 'MailStore'

const initialState = {
    stage: Stage.BASIC,
    sending: false,
    error: '',
    subject: '',
    receiver: '',
    cc: '',
    body: '',
    attachments: [],
}

export const useMailStore = create<MailStore>(
    persist(
        (set, get) => ({
            ...initialState,

            nextStage(data: Partial<FormFields> = {}) {
                const { stage } = get()
                if (stage !== Stage.SENT) {
                    set({ stage: stage + 1, ...data }, undefined, 'nextStage')
                }
            },
            previousStage() {
                const { stage } = get()
                if (stage !== Stage.BASIC) {
                    set({ stage: stage - 1 }, undefined, 'previousStage')
                }
            },
            resetStage() {
                set({ stage: Stage.BASIC }, undefined, 'resetStage')
            },
            showError(message: string, delay = ERROR_TIMEOUT) {
                set({ error: message }, undefined, 'showError')
                setTimeout(() => {
                    set({ error: '' })
                }, delay)
            },
            send() {
                const { subject, receiver, cc, body, attachments } = get()
                if (!get().sending) {
                    set({ sending: true })
                    send({ subject, receiver, cc, body, attachments }).then(() => get().nextStage())
                        .catch(({ message }) => get().showError(message))
                        .finally(() => set({ sending: false }))
                }
            },
        }),
        {
            name,
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
    name,
)
