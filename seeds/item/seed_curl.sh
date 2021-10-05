#!/bin/bash

declare -a names=("xburguer" "sorvete" "xbacon" "xsalada" "banana")
images="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.policymed.com%2F2013%2F04%2Ffda-outlines-generic-safety-and-efficacy.html&psig=AOvVaw3SmuksgaNUp6qfAr_ogq_h&ust=1633521818034000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJjNspads_MCFQAAAAAdAAAAABAD"
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
