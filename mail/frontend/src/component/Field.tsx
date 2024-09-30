import { Controller, useFormContext } from 'react-hook-form'
import { FormFields } from './util'
import { TextField } from '@mui/material'

/**
 * Renders text field within {@link Controller}.
 *
 * @param label description of field
 * @param multiline whether to render input or textarea
 * @param name identifier within form group
 * @param readOnly whether field should not be interactive
 */
export function Field({
    label,
    multiline = false,
    name,
    readOnly,
}: {
    label: string
    multiline?: boolean
    name: keyof FormFields,
    readOnly: boolean
}) {
    const { control } = useFormContext()

    return <Controller
        render={({ field, fieldState: { error } }) => <TextField
            {...field}
            error={error !== undefined}
            helperText={error?.message as string}
            label={label}
            minRows={4}
            maxRows={15}
            multiline={multiline}
            InputProps={{ readOnly }}
        />}
        name={name}
        control={control}
    />
}
