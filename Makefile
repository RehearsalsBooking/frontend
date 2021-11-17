#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh

php_container_name := backend
node_container_name := frontend
docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)
docker_compose_yml := docker/docker-compose.yml
user_id := $(shell id -u)

.PHONY : help pull build push login test clean \
         app-pull app app-push\
         sources-pull sources sources-push\
         nginx-pull nginx nginx-push\
         up down restart shell install
.DEFAULT_GOAL := help

# --- [ Development tasks ] -------------------------------------------------------------------------------------------
help:  ## Display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

routes:
	$(docker_compose_bin) --file "$(docker_compose_yml)" exec "$(php_container_name)" /bin/bash -c "php artisan route:list"

seed:
	$(docker_compose_bin) --file "$(docker_compose_yml)" exec "$(php_container_name)" /bin/bash -c "php artisan migrate:fresh --force --seed"

init:
	$(docker_compose_bin) --file "$(docker_compose_yml)" exec -e XDEBUG_MODE=off "$(php_container_name)" composer install
	$(docker_compose_bin) --file "$(docker_compose_yml)" exec "$(php_container_name)" php artisan migrate:fresh --force --seed
	$(docker_compose_bin) --file "$(docker_compose_yml)" exec "$(php_container_name)" php artisan config:cache
	$(docker_compose_bin) --file "$(docker_compose_yml)" exec "$(php_container_name)" php artisan route:cache
	$(docker_compose_bin) --file "$(docker_compose_yml)" exec "$(php_container_name)" php artisan storage:link

run: up init
	echo "project launched at http://rehearsals.local:8080/"

up:
	docker pull docker.pkg.github.com/rehearsalsbooking/backend/backend:latest
	$(docker_compose_bin) --file "$(docker_compose_yml)" up -d

down:
	$(docker_compose_bin) --file "$(docker_compose_yml)" down

update:
	$(docker_compose_bin) --file "$(docker_compose_yml)" run --rm "$(node_container_name)" npm install -g npm && npm update

fix:
	$(docker_compose_bin) --file "$(docker_compose_yml)" run --rm "$(node_container_name)" npm audit fix

install:
	$(docker_compose_bin) --file "$(docker_compose_yml)" run --rm "$(node_container_name)" npm install $(filter-out $@,$(MAKECMDGOALS))

shell:
	$(docker_compose_bin) --file "$(docker_compose_yml)" run --rm "$(node_container_name)" sh


