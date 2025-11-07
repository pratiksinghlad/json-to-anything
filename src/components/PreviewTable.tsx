import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade,
} from '@mui/material';
import { getAllKeys, flattenObject } from '../utils/flattenObject';

interface PreviewTableProps {
  data: Record<string, unknown>[];
  maxRows?: number;
}

export default function PreviewTable({ data, maxRows = 50 }: PreviewTableProps) {
  if (data.length === 0) {
    return null;
  }

  const columns = getAllKeys(data);
  const displayData = data.slice(0, maxRows);
  const hasMore = data.length > maxRows;

  return (
    <Fade in={true} timeout={500}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Preview {hasMore && `(showing ${maxRows} of ${data.length} rows)`}
        </Typography>
        <TableContainer component={Paper} elevation={2} sx={{ maxHeight: 500 }}>
          <Table stickyHeader size="small" aria-label="CSV preview table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      fontWeight: 'bold',
                      backgroundColor: '#f5f5f5',
                      whiteSpace: 'nowrap',
                      borderRight: '2px solid rgba(224, 224, 224, 1)',
                      '&:last-child': {
                        borderRight: 'none',
                      },
                    }}
                  >
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayData.map((row, index) => {
                const flattened = flattenObject(row);
                return (
                  <TableRow key={index} hover>
                    {columns.map((column) => {
                      const value = flattened[column];
                      const displayValue =
                        value === null || value === undefined
                          ? ''
                          : String(value);
                      return (
                        <TableCell
                          key={column}
                          sx={{
                            maxWidth: 300,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            borderRight: '2px solid rgba(224, 224, 224, 1)',
                            '&:last-child': {
                              borderRight: 'none',
                            },
                          }}
                        >
                          {displayValue}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Fade>
  );
}
