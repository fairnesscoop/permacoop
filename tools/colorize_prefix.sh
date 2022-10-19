#!/bin/sh -eu
# Credits: https://ops.tips/gists/shell-prefix-output-of-commands/

# Usage: ./colorize_prefix.sh prefix color command
# Eg:
#   ./colorize_prefix.sh [client] 33 "npm run dev"

PREFIX_TEXT="$1"
COLOR_CODE="$2"
COMMAND="$3"

# Apply ANSI terminal color
# See: http://jafrog.com/2013/11/23/colors-in-terminal.html
PREFIX_COLORIZED=$(echo "\033[${COLOR_CODE}m${PREFIX_TEXT}\033[0m")

# script ... preserves color output
# See: https://stackoverflow.com/a/3515296
script -q /dev/null bash -c "${COMMAND}" | sed -u "s/^/${PREFIX_COLORIZED} /"
