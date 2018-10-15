#! /usr/bin/env bash

set -u -e -o pipefail

usage="Usage: ./generate_weapon_bookmarklet.sh [-e] <weapon_type> <weapon_name>"

show_help() {
cat << EOF
$usage

  Generate bookmarklet to create a weapon
      -h    Display this help and exit.
      -e    Event weapon flag

EOF
}
# Default
event_weapon=false

# Parse options
OPTIND=1
while getopts "he" opt; do
    case "$opt" in
        "h") show_help; exit 0;;
        "e") event_weapon=true;;
    esac
done
shift $(($OPTIND - 1))

if [ $# -lt 2 ]; then
    show_help
    exit 1
fi

weapon_type="$1"
weapon_name="$2"
weapon_type_replace_string=$(printf "s/種類/%s/" "$weapon_type")
weapon_name_replace_string=$(printf "s/名前/%s/" "$weapon_name")
event_flag_replace_string=$(printf "s/const event_weapon = false;/const event_weapon = %s;/" "$event_weapon")

cat create_weapon.js \
    | sed -E "$weapon_type_replace_string" \
    | sed -E "$weapon_name_replace_string" \
    | sed -E "$event_flag_replace_string"


