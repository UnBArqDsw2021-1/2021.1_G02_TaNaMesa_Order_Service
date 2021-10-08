SHELL := /bin/bash # Use bash syntax
CURRENT_DIR := $(shell pwd)
RUNNING_NETWORK := $(shell docker network ls -f name=tanamesa_gateway | grep tanamesa_gateway )


build:
	docker-compose build

run:
	@if [[ -n "${RUNNING_NETWORK}" ]]; then \
		docker-compose up; \
	else \
		docker network create tanamesa_gateway; \
		docker-compose up; \
	fi
	

run-silent:
	@if [[ -n "${RUNNING_NETWORK}" ]]; then \
		docker-compose up -d; \
	else \
		docker network create tanamesa_gateway; \
		docker-compose up -d; \
	fi

run-build:
	@if [[ -n "${RUNNING_NETWORK}" ]]; then \
		docker-compose up --build; \
	else \
		docker network create tanamesa_gateway; \
		docker-compose up --build; \
	fi

down:
	docker-compose down

lint: 
	docker-compose run order_service yarn lint

test:
	docker-compose run order_service yarn test:ci

check-db:
	docker-compose exec db_order psql -U postgres

cov:
	docker-compose run order_service yarn cov

seed-devel:
	chmod +x ./seeds/runSeeds.sh && \
	./seeds/runSeeds.sh http://0.0.0.0:3333/

seed-prod:
	chmod +x ./seeds/runSeeds.sh && \
	./seeds/runSeeds.sh https://tanamesa-dev-dsw.herokuapp.com/
