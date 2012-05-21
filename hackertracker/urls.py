from django.conf.urls.defaults import patterns, include, url
from hackers import views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', views.index),
    (r'index/', views.index),
    (r'create/$', views.create),
    (r'get_markers_xml/$', views.get_markers_xml),
    (r'get_markers_json/$', views.get_markers_json),
    # Examples:
    # url(r'^$', 'hackertracker.views.home', name='home'),
    # url(r'^hackertracker/', include('hackertracker.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
