import React, { FC } from 'react'
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { TableElements } from '../../src/types/table'
import { tableContainer } from '../../styles/components/mui/muiTable.styles'

type MuiTableProps = {
  element: TableElements
}

const MuiTable: FC<MuiTableProps> = ({ element }) => {
  const { mainRow, subRows, bodies } = element
  return (
    <TableContainer component={Paper} css={tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{mainRow}</TableCell>
            {subRows.map((subRow, i) => (
              <TableCell key={i} align="right">
                {subRow}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bodies.map((body, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {body.main}
              </TableCell>
              {body.sub.map((sub, i) => (
                <TableCell key={i} align="right">
                  {sub}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MuiTable
