import React, { FC, useState } from 'react'
import { Modal, Box, Typography, Grid } from '@mui/material'
import MuiButton from '../mui/MuiButton'
import { markdownElement } from '../../src/utils/tableElement'
import MuiTable from '../mui/MuiTable'
import { styles } from '../../styles/components/form/markdownCheatSheet.style'

type MarkdownCheatSheetProps = {}

const MarkdownCheatSheet: FC<MarkdownCheatSheetProps> = () => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }
  const { h2, button } = styles

  return (
    <>
      <MuiButton
        variant="contained"
        color="inherit"
        type="button"
        label="Cheat"
        onClick={handleOpen}
        css={button}
      />
      <Modal open={open} aria-labelledby="modal-cheat-sheet">
        <Box>
          <Grid container justifyContent="center" css={h2}>
            <Typography id="modal-cheat-sheet" variant="h6" component="h2">
              チートシート
            </Typography>
            <MuiButton
              variant="contained"
              color="inherit"
              onClick={handleClose}
              label="Close"
              type="button"
              css={button}
            />
          </Grid>
          <Grid container justifyContent="center">
            <MuiTable element={markdownElement} />
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default MarkdownCheatSheet
