declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL?: string }) => Promise<any>;
  }
}

let pyodideInstance: any = null;
let isLoading = false;

export async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (isLoading) {
    while (isLoading) {
      await new Promise((res) => setTimeout(res, 200));
    }
    return pyodideInstance;
  }

  isLoading = true;

  try {
    if (!window.loadPyodide) {
      throw new Error("Pyodide script not loaded in index.html");
    }

    pyodideInstance = await window.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
    });

    // Initialize Python environment stdout redirect & smart browser input handler
    await pyodideInstance.runPythonAsync(`
import sys
import io
import builtins
import js

class OutputCapture:
    def __init__(self):
        self.buffer = io.StringIO()
    def write(self, s):
        self.buffer.write(s)
    def flush(self):
        pass
    def get_output(self):
        return self.buffer.getvalue()

def __smart_input(prompt=""):
    prompt_str = str(prompt) if prompt else ""
    if prompt_str:
        sys.stdout.write(prompt_str)
    try:
        res = js.prompt(prompt_str if prompt_str else "Python input required:")
        val = res if res is not None else "Hero"
    except Exception:
        val = "Hero"
    sys.stdout.write(str(val) + "\\n")
    return str(val)

builtins.input = __smart_input
`);
  } catch (err) {
    console.error("Failed to initialize Pyodide WASM runtime:", err);
  } finally {
    isLoading = false;
  }

  return pyodideInstance;
}

export interface RunPythonResult {
  success: boolean;
  output: string;
  result?: string;
  error?: string;
  executionTimeMs: number;
}

export async function runPythonCode(code: string): Promise<RunPythonResult> {
  const startTime = performance.now();
  try {
    const pyodide = await getPyodide();
    if (!pyodide) {
      return {
        success: false,
        output: '',
        error: 'Pyodide WASM engine could not be initialized. Please check internet connection.',
        executionTimeMs: 0
      };
    }

    // Reset output capture buffer for each run
    await pyodide.runPythonAsync(`
__stdout_capture = OutputCapture()
sys.stdout = __stdout_capture
sys.stderr = __stdout_capture
`);

    // Execute user Python code
    let res = await pyodide.runPythonAsync(code);

    // Fetch stdout output
    const stdout = await pyodide.runPythonAsync(`__stdout_capture.get_output()`);

    const executionTimeMs = Math.round(performance.now() - startTime);

    return {
      success: true,
      output: stdout || '',
      result: res !== undefined && res !== null && typeof res !== 'object' ? String(res) : undefined,
      executionTimeMs
    };
  } catch (err: any) {
    const executionTimeMs = Math.round(performance.now() - startTime);
    
    // Attempt to salvage any partial stdout output printed before error
    let partialStdout = '';
    try {
      if (pyodideInstance) {
        partialStdout = await pyodideInstance.runPythonAsync(`__stdout_capture.get_output()`);
      }
    } catch (e) {
      // Ignore
    }

    return {
      success: false,
      output: partialStdout || '',
      error: err?.message || String(err),
      executionTimeMs
    };
  }
}
