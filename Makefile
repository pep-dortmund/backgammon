all: server

server:
	FLASK_APP=backgammon.py FLASL_ENV=development flask run
