#!/bin/bash

declare -a cpfWaiter=("123458" "123460")
declare -a needHelp=("True" "False")

make_request() {
    curl "$url" \
    -H "$AUTH" \
    -H 'content-type: application/json' \
    -d "$data_raw"
}

printf -v url '%s%s' "$API_URL" 'table'

for i in "${!cpfWaiter[@]}"; do
    printf -v data_raw \
        '{
            "table": {
                "cpfWaiter": "%s",
                "needHelp": "%s"
            }
        }' \
        "${cpfWaiter[$i]}" "${needHelp[$i]}"
    make_request
    echo ""
done
