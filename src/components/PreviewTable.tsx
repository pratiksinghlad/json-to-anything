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
} from "@mui/material";
import { getAllKeys, flattenObject } from "../utils/flattenObject";
import { toPascalCase } from "../utils/jsonToCsv";

interface PreviewTableProps {
  data: Record<string, unknown>[];
  maxRows?: number;
  pascalCaseHeaders?: boolean;
}

export default function PreviewTable({
  data,
  maxRows = 50,
  pascalCaseHeaders = false,
}: PreviewTableProps) {
  if (data.length === 0) {
    return null;
  }

  const columns = getAllKeys(data);
  const displayData = data.slice(0, maxRows);
  const hasMore = data.length > maxRows;

  return (
    <Fade in={true} timeout={500}>
      <Box>
        <Typography variant="h6" gutterBottom sx={{ color: "#000000", fontWeight: 500 }}>
          Preview {hasMore && `(showing ${maxRows} of ${data.length} rows)`}
        </Typography>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            maxHeight: 500,
            border: "1px solid #d0d0d0",
            borderRadius: "8px",
            backgroundColor: "#ffffff",
          }}
        >
          <Table stickyHeader size="small" aria-label="CSV preview table">
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  const displayHeader = pascalCaseHeaders ? toPascalCase(column) : column;
                  return (
                    <TableCell
                      key={column}
                      sx={{
                        fontWeight: 600,
                        backgroundColor: "#f5f5f5",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #e0e0e0",
                        borderBottom: "2px solid #d0d0d0",
                        color: "#000000",
                        fontSize: "0.875rem",
                        "&:last-child": {
                          borderRight: "none",
                        },
                      }}
                    >
                      {displayHeader}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayData.map((row, index) => {
                const flattened = flattenObject(row);
                return (
                  <TableRow
                    key={index}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f9f9f9",
                      },
                    }}
                  >
                    {columns.map((column) => {
                      const value = flattened[column];
                      const displayValue =
                        value === null || value === undefined ? "" : String(value);
                      return (
                        <TableCell
                          key={column}
                          sx={{
                            maxWidth: 300,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            borderRight: "1px solid #e0e0e0",
                            borderBottom: "1px solid #e0e0e0",
                            color: "#000000",
                            fontSize: "0.8125rem",
                            "&:last-child": {
                              borderRight: "none",
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
