import { useCallback, useMemo } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { useShallow } from 'zustand/react/shallow'
import { pick } from 'lodash'
import { Alert, Button, Stack } from '@mui/material'
import { CloudUpload, NavigateBefore, NavigateNext, Send as SendIcon } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Stage, useMailStore } from '../store/mail'
import { FormFields, validationSchema } from './util'
import { Field } from './Field'
import { Attachment } from './Attachment'

const BasicStage = function BasicStage() {
    const stage = useMailStore((state) => state.stage)
    const readOnly = stage === Stage.SUMMARY

    if (stage !== Stage.BASIC && !readOnly) {
        return <></>
    }

    return <>
        <Field name="subject" label="Subject *" readOnly={readOnly} />
        <Field name="receiver" label="Receiver email *" readOnly={readOnly} />
        <Field name="cc" label="Carbon copy emails" readOnly={readOnly} />
    </>
}

function DescriptionStage() {
    const stage = useMailStore((state) => state.stage)

    if (![Stage.DESCRIPTION, Stage.SUMMARY].includes(stage)) {
        return <></>
    }

    return <Field name="body" label="Body *" multiline readOnly={stage === Stage.SUMMARY} />
}

function AttachmentStage() {
    const { formState: { errors }, handleSubmit, register } = useFormContext()
    const stage = useMailStore((state) => state.stage)
    const writeable = stage !== Stage.SUMMARY

    if (stage !== Stage.ATTACHMENT && writeable) {
        return <></>
    }
    const control = register('attachments')

    return <>
        {writeable && <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUpload />}>
            Upload attachments
            <input
                {...control}
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={(event) => {
                    control.onChange(event)
                    handleSubmit(async (data) => {
                        const attachments = (data as FormFields).attachments
                        if (attachments) {
                            useMailStore.setState({ attachments })
                        }
                    })()
                }}
            />
        </Button>}
        {typeof errors.attachments?.message === 'string' && <Alert severity="error">{errors.attachments.message}</Alert>}
        <Attachment />
    </>
}

function SentStage() {
    const isNotSentStage = useMailStore(useShallow((state) => state.stage !== Stage.SENT))
    if (isNotSentStage) {
        return <></>
    }

    return <Alert severity="success">Mail was sucessfully sent and processed.</Alert>
}

function Buttons() {
    const { handleSubmit, control } = useFormContext()
    const [stage, sending, nextStage, onPrevious, onReset] = useMailStore(useShallow((state) => [
        state.stage, state.sending, state.nextStage, state.previousStage, state.resetStage,
    ]))

    const onNext = useCallback(() => {
        handleSubmit(nextStage, (errors) => {
            if (stage === Stage.BASIC && !Object.keys(errors).some((invalidField) => ['subject', 'receiver', 'cc'].includes(invalidField))) {
                nextStage(pick(control._formValues, 'subject', 'receiver', 'cc'))
            } else if (stage === Stage.DESCRIPTION && errors.body === undefined) {
                nextStage(pick(control._formValues, 'body'))
            }
        })()
    }, [control._formValues, handleSubmit, nextStage, stage])

    return <Stack direction="row">
        {stage > Stage.BASIC && stage < Stage.SENT && <Button variant="contained" startIcon={<NavigateBefore />} onClick={onPrevious}>Previous</Button>}
        {stage < Stage.SUMMARY && <Button variant="contained" className="next" endIcon={<NavigateNext />} onClick={onNext}>Next</Button>}
        {stage === Stage.SUMMARY && <LoadingButton
            variant="contained"
            endIcon={<SendIcon />}
            loading={sending}
            loadingPosition="end"
            type="submit"
        >
            Send mail
        </LoadingButton>}
        {stage === Stage.SENT && <Button variant="contained" onClick={onReset}>Create new mail</Button>}
    </Stack>
}

/**
 * Renders form component with {@link FormFields} fields and {@link Stage} stages.
 */
export function Form() {
    const [subject, receiver, cc, body, attachments, send] = useMailStore((state) => [
        state.subject, state.receiver, state.cc, state.body, state.attachments, state.send,
    ])
    const methods = useForm({
        defaultValues: { subject, receiver, cc, body, attachments },
        resolver: joiResolver(validationSchema),
    })
    const handleSubmit = methods.handleSubmit
    const onSubmit = useMemo(() => handleSubmit((data) => {
        send(data)
    }), [handleSubmit, send])

    return <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
            <Stack direction="column" spacing={3}>
                <BasicStage />
                <DescriptionStage />
                <AttachmentStage />
                <SentStage />
                <Buttons />
            </Stack>
        </form>
    </FormProvider>
}
