# Directive: System Health Check

## Goal

Verify that the 3-layer architecture is correctly set up and that the execution layer (Python) is functioning as expected.

## Inputs

### JSON Schema

```json
{
  "type": "object",
  "properties": {},
  "required": []
}
```

## Tools/Scripts

- `execution/check_system.py`

## Outputs

### Success (JSON to stdout)

```json
{
  "status": "success",
  "data": {
    "python_version": "3.12.0",
    "platform": "macOS-14.0",
    "cwd": "/path/to/project",
    "checks": {
      "directives": "EXISTS",
      "execution": "EXISTS",
      ".tmp": "EXISTS"
    }
  }
}
```

### Error

Standard error JSON with `status: "error"` and a message.

## Edge Cases

- Python not installed -> System should report error.
- `.tmp` directory missing -> Script should create it or report error (though it should exist).
