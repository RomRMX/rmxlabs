# Directive: System Health Check

## Goal

Verify that the 3-layer architecture is correctly set up and that the execution layer (Python) is functioning as expected.

## Inputs

None.

## Tools/Scripts

- `execution/check_system.py`

## Outputs

- Console output confirming Python version and environment status.
- A file in `.tmp/system_status.txt` with the details.

## Edge Cases

- Python not installed -> System should report error.
- `.tmp` directory missing -> Script should create it or report error (though it should exist).
