import os, sys

sys.path.append('/var/www/hackertracker.lexiross.com/html')
sys.path.append('/var/www/hackertracker.lexiross.com/html/hackertracker')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hackertracker.settings")

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
