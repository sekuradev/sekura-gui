watch-nginx:
	iwatch -c "docker-compose exec nginx nginx -s reload" -e close_write -t "sekura.conf" ./nginx
