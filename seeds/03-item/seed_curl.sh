#!/bin/bash

declare -a names=("xburguer" "sorvete" "xbacon" "xsalada" "banana")
images="https://www.policymed.com/wp-content/uploads/2013/04/6a00e5520572bb8834017c3875ac22970b.jpg"
declare -a prices=($(seq 10 1 15))
declare -a discounts=($(yes "0" | head -n 5))
declare -a descriptions=(
"Isso aqui é um xburguer"
"Isso aqui é um sorvete"
"Isso aqui é um xbacon" 
"Isso aqui é um xsalada"
"Isso aqui é uma banana"
)
declare -a categories=(
"hamburgueres"
"sobremesas"
"hamburgueres"
"hamburgueres"
"sobremesas"
)

make_request() {
    curl "$url" \
    -H "$AUTH" \
    -H 'content-type: application/json' \
    -d "$data_raw"
}


printf -v url '%s%s' "$API_URL" 'item'

for i in "${!names[@]}"; do
    printf -v data_raw \
        '{
            "item": {
                "name": "%s",
                "image": "%s",
                "price": %d,
                "discount": %d,
                "description": "%s",
                "category": "%s"
            }
        }' \
        "${names[$i]}" "$images" "${prices[$i]}" "${discounts[$i]}" \
        "${descriptions[$i]}" "${categories[$i]}"
    make_request
    echo ""
done
