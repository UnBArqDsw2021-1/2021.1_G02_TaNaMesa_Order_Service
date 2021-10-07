#!/bin/bash

declare -a names=("sergio" "brenda" "wash" "marcelo" "helena")

make_request() {
    curl "$url" \
    -H "$AUTH" \
    -H 'content-type: application/json' \
    -d "$data_raw"
}

printf -v url '%s%s' "$API_URL" 'client'

for name in "${names[@]}"; do
    printf -v data_raw '{ "client": { "name": "%s" } }' "$name"
    make_request
    echo ""
done
