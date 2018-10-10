#! /usr/bin/env bash

set -u -e -o pipefail

usage="Usage: ./generate_haken_bookmarklet.sh <1番目の派眷先> [2番目の派眷先...]"

show_help() {
cat << EOF
$usage

EOF
}

if [ $# -lt 1 ]; then
    show_help
    exit 1
fi

reverse() {
    for ((i=$#;i>=1;i--))
    do
        echo "${!i}"
    done
}

output=$(cat haken_base.js | sed '/番目の派眷先/d')
for place in $(reverse "$@"); do
    sed_command=$(printf '/const haken_order/a \    "%s",' "$place")
    output=$(echo "$output" | sed "$sed_command")
done
echo "$output"
