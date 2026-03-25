import type { FileDefinition } from "@typetrainer/shared";

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PyodideInterface = any;

let pyodideInstance: PyodideInterface = null;
let loadingPromise: Promise<PyodideInterface> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

async function getPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;

  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    await loadScript(`${PYODIDE_CDN}pyodide.js`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loadPyodide = (globalThis as any).loadPyodide;
    if (!loadPyodide) throw new Error("Pyodide failed to load");
    pyodideInstance = await loadPyodide({ indexURL: PYODIDE_CDN });
    return pyodideInstance;
  })();

  return loadingPromise;
}

export type RunResult = {
  stdout: string;
  stderr: string;
  success: boolean;
  error?: string;
};

export async function runPython(
  files: FileDefinition[],
  entrypoint: string = "main.py",
): Promise<RunResult> {
  const pyodide = await getPyodide();

  // Write all files to the virtual filesystem
  for (const file of files) {
    const parts = file.path.split("/");
    if (parts.length > 1) {
      let dir = "";
      for (let i = 0; i < parts.length - 1; i++) {
        dir += (dir ? "/" : "") + parts[i];
        try {
          pyodide.FS.mkdir(dir);
        } catch {
          // directory already exists
        }
      }
    }
    pyodide.FS.writeFile(file.path, file.content);
  }

  // Capture stdout and stderr
  let stdout = "";
  let stderr = "";

  pyodide.setStdout({
    batched: (text: string) => {
      stdout += text + "\n";
    },
  });

  pyodide.setStderr({
    batched: (text: string) => {
      stderr += text + "\n";
    },
  });

  try {
    const entryFile = files.find((f) => f.path === entrypoint);
    if (!entryFile) {
      return {
        stdout: "",
        stderr: `Error: ${entrypoint} not found`,
        success: false,
        error: `${entrypoint} not found`,
      };
    }

    await pyodide.runPythonAsync(entryFile.content);

    return { stdout, stderr, success: true };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return {
      stdout,
      stderr: stderr + errorMessage,
      success: false,
      error: errorMessage,
    };
  }
}

export async function validateOutput(
  files: FileDefinition[],
  expectedOutput: string,
): Promise<RunResult & { passed: boolean }> {
  const result = await runPython(files);

  if (!result.success) {
    return { ...result, passed: false };
  }

  const passed = result.stdout === expectedOutput;
  if (!passed) {
    result.stderr = `Expected output:\n${expectedOutput}\nActual output:\n${result.stdout}`;
  }

  return { ...result, passed };
}

export async function runTestFile(
  files: FileDefinition[],
  testFile: FileDefinition,
): Promise<RunResult & { passed: boolean }> {
  const allFiles = [...files, testFile];
  const result = await runPython(allFiles, testFile.path);

  return {
    ...result,
    passed: result.success && !result.stderr,
  };
}
