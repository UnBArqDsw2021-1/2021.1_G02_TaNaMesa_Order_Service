#!/bin/bash

declare -a names=("sergio" "brenda" "wash" "marcelo" "helena")
declare -a cpfs=($(seq 123456 1 123461))
declare -a occupations=("gerente" "cozinha" "garcom" "cozinha" "garcom")
declare -a passwords=($(yes "654321" | head -n 5))

make_request() {
    curl "$url" \
    -H 'content-type: application/json' \
    -d "$data_raw"
}

printf -v url '%s%s' "$API_URL" 'employee'

for i in "${!names[@]}"; do
    printf -v data_raw \
        '{
            "employee": {
                "cpf": "%s",
                "name": "%s",
                "occupation": "%s",
                "password": "%s"
            }
        }' \
        "${cpfs[$i]}" "${names[$i]}" "${occupations[$i]}" "${passwords[$i]}"
    make_request
    echo ""
done
