import { Box, Paper, Typography, Alert } from '@mui/material';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/themes/prism.css';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const highlight = (code: string) => {
  return Prism.highlight(code, Prism.languages.json, 'json');
};

export default function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        JSON Input
      </Typography>
      <Paper
        elevation={2}
        sx={{
          border: error ? '2px solid #d32f2f' : '1px solid #e0e0e0',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={highlight}
          padding={16}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight: '400px',
            backgroundColor: '#fafafa',
          }}
          textareaId="json-editor"
          aria-label="JSON editor"
        />
      </Paper>
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
