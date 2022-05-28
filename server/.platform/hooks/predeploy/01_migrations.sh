#!/bin/bash

source /var/app/venv/*/bin/activate
cd /var/app/staging

python3 manage.py migrate
python3 manage.py createsu
python3 manage.py collectstatic
