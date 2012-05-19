# Create your views here.
# Sure thing, Mr. Django!

from django import forms
from django.http import HttpResponseRedirect
from django.template import RequestContext
from django.shortcuts import render_to_response
from hackers.models import *
from hackers.forms import *
from django.utils import simplejson
from django.http import HttpResponse
import json
#from xml.dom.minidom import Document
import xml.etree.ElementTree as xml

def index(request):
    return render_to_response('index.html', context_instance=RequestContext(request))

def create(request):
    # server-side validation - unnecessary unless user turns off js
    error = False
    post = request.POST
    if 'name' in post and 'email' in post and 'location' in post \
            and 'lat' in post and 'lng' in post:
        name = post['name']
        email = post['email']
        location = post['location']
        lat = post['lat']
        lng = post['lng']
        description = ""
        if 'description' in post and post['description']:
            description = post['description']
        if name and email and location and lat and lng:
            hacker = Hacker(name=name, email=email, location=location, description=description, lat=lat, lng=lng)
            hacker.save()
        else:
            error = True
    else:
        error = True
    if error:
        return HttpResponse("Error")
    else:
        return HttpResponse("Success")

# create new hacker model
# overlay on graph

def get_markers(request):
    hackers = Hacker.objects.all()

    # generate XML (as in tutorial)
    #doc = Document()
    #node = doc.createElement("markers")
    #parnode = doc.appendChild(node)

    root = xml.Element("markers")
    for m in hackers:
        node = xml.Element("marker")
        root.append(node)
        node.attrib['name'] = m.name
        node.attrib['email'] = m.email
        node.attrib['location'] = m.location
        node.attrib['description'] = m.description
        node.attrib['lat'] = m.lat
        node.attrib['lng'] = m.lng

    data = xml.tostring(root)
    return HttpResponse(data, mimetype="text/xml", content_type="text/xml")



