#!/bin/bash

declare -a status=("na fila" "na cozinha" "preparando" "na mesa")
declare -a idTable=(1 2)
declare -a idClient=(1 2)
declare -a nameClient=("sergio" "brenda")

make_request() {
    curl "$url" \
    -H "$AUTH" \
    -H 'content-type: application/json' \
    -d "$data_raw"
}

printf -v url '%s%s' "$API_URL" 'order'

for i in "${!idTable[@]}"; do
    printf -v data_raw \
        '{
            "order": {
                "status": "%s",
                "idTable": "%s",
                "idClient": "%s",
                "nameClient": "%s"
            }
        }' \
        "${status[$i]}" "${idTable[$i]}" "${idClient[$i]}" "${nameClient[$i]}"
    make_request
    echo ""
done
