#!/bin/bash

declare -a idItem=(1 2)
declare -a idOrder=(1 2)

make_request() {
    curl "$url" \
    -H "$AUTH" \
    -H 'content-type: application/json' \
    -d "$data_raw"
}

printf -v url '%s%s' "$API_URL" 'contain'

for i in "${!idItem[@]}"; do
    printf -v data_raw \
        '{
            "contain": {
                "idItem": "%s",
                "idOrder": "%s"
            }
        }' \
        "${idItem[$i]}" "${idOrder[$i]}"
    make_request
    echo ""
done
