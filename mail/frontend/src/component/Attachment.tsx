import { Dispatch, useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Box, Card, CardMedia, LinearProgress, Skeleton, Typography } from '@mui/material'
import { Attachment, upload } from '../api'
import { useMailStore } from '../store/mail'
import { PictureAsPdf } from '@mui/icons-material'

function UploadProgress({ file, setUploaded }: { file: File; setUploaded: Dispatch<React.SetStateAction<Attachment[]>> }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        upload(file, (event) => {
            setProgress(event.progress ?? 0)
        }).then(({ data }) => {
            data.type = file.type
            setUploaded((uploaded) => [...uploaded, data])
        })
    }, [file, setUploaded])

    return <Card variant="outlined" className="attachment-card">
        <Skeleton variant="rectangular" height={50} width={50} />
        <Box className="label">
            <Typography>
                {file.name}
            </Typography>
            <LinearProgress value={progress * 100} variant="determinate" color="primary" />
        </Box>
    </Card>
}

/**
 * Renders components for attachment mail secion.
 */
export function Attachment() {
    const [files, attachments] = useMailStore(useShallow((state) => [
        state.attachments.filter((file) => file instanceof File) as File[],
        state.attachments.filter((file) => !(file instanceof File)) as Attachment[],
    ]))
    const [uploaded, setUploaded] = useState<Attachment[]>([])

    useEffect(() => {
        if (uploaded.length > 0 && uploaded.length === useMailStore.getState().attachments.length) {
            useMailStore.setState({ attachments: uploaded })
            setUploaded([])
        }
    }, [uploaded, uploaded.length])

    return <>
        {files.map((file) => <UploadProgress key={file.name} file={file} setUploaded={setUploaded} />)}
        {attachments.map((attachment) => <Card variant="outlined" key={attachment.location} className="attachment-card">
            {attachment.type === 'application/pdf' ? <PictureAsPdf fontSize='large' /> : <CardMedia component="img" height="50" src={attachment.location} />}
            <Box className="label">
                <Typography>{attachment.originalname}</Typography>
            </Box>
        </Card>)}
    </>
}
