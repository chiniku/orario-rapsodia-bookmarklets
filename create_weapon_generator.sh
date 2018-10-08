#! /usr/bin/env bash

set -u -e -o pipefail

usage="Usage: create_weapon_generator <weapon_type> <weapon_name>"

show_help() {
cat << EOF
$usage

EOF
}

if [ $# -lt 2 ]; then
    show_help
    exit 1
fi

weapon_type="$1"
weapon_name="$2"
weapon_type_replace_string=$(printf "s/種類/%s/" "$weapon_type")
weapon_name_replace_string=$(printf "s/名前/%s/" "$weapon_name")

cat create_weapon.js | sed -E "$weapon_type_replace_string" | sed -E "$weapon_name_replace_string"
