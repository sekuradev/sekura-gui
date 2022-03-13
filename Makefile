watch-nginx:
	iwatch -c "docker-compose exec nginx nginx -s reload" -e close_write -t "sekura.conf" ./nginx

watch-tests:
	docker-compose exec sekura pip install -r requirements-dev.txt
	iwatch -r -c "docker-compose exec sekura pytest -v -ra" -e close_write -t ".*.py" ./sekura
