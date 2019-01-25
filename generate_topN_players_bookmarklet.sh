#! /usr/bin/env bash

set -u -e -o pipefail

usage="Usage: ./generate_topN_players_bookmarklet.sh [-pq] <top-N>"

show_help() {
cat << EOF
$usage

  Generate bookmarklet for printing topN players
      -h    Display this help and exit.
      -p    Print result for copy and paste
      -q    Quiet

EOF
}
# Default
print_flag=false
quiet_flag=false

# Parse options
OPTIND=1
while getopts "hpq" opt; do
    case "$opt" in
        "h") show_help; exit 0;;
        "p") print_flag=true;;
        "q") quiet_flag=true;;
    esac
done
shift $(($OPTIND - 1))

if [ $# -lt 1 ]; then
    show_help
    exit 1
fi

topN="$1"
topN_replace_string=$(printf "s/<topN>/%s/" "$topN")
print_flag_replace_string=$(printf "s/const print_flag = false;/const print_flag = %s;/" "$print_flag")
quiet_flag_replace_string=$(printf "s/const quiet_flag = false;/const quiet_flag = %s;/" "$quiet_flag")

cat topN_players.js \
    | sed -E "$topN_replace_string" \
    | sed -E "$print_flag_replace_string" \
    | sed -E "$quiet_flag_replace_string"
