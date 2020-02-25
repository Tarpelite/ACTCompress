from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import Counter, Record
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import oss2
# Create your views here.

endpoint = ""
access_ID = ""
access_key = ""
bucket_name=""
auth = oss2.Auth(access_ID, access_key)
bucket = oss2.Bucket(auth, endpoint, bucket_name)


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARD_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@api_view(["GET"])
def get_cnt(request):
    counter = Counter.objects.all()
    cnt =  counter.cnt
    res = {
        "cnt":cnt
    }
    return Response(res, status=status.HTTP_200_OK)

@api_view(["POST"])
def submit(request):
    data = request.data
    school = data["s1"]
    college = data["s2"]
    counter = Counter.objects.all()
    if len(counter) == 0:
        counter = Counter(cnt=0)
        cnt = 0
    else:
        counter = counter[0]
        cnt = counter.cnt
    try:
        ip = get_client_ip(request)
    except Exception as e:
        ip = ""

    record = Record(
        school = str(school),
        college = str(college),
        ip = str(ip)
    )

    key1 = "Compress.exe"
    key2 = "Compress-win32.exe"
    link1 = bucket.sign_url("GET", key1, 600)
    link2 = bucket.sign_url("GET", key2, 600)
    counter.cnt += 1
    counter.save()
    record.save()
    context = {
        "link1":link1,
        "link2":link2
    }
    return Response(context, status=status.HTTP_200_OK)
    

def index(request):
    counter = Counter.objects.all()
    if len(counter) == 0:
        counter = Counter(cnt=0)
        cnt = 0
    else:
        counter = counter[0]
        cnt = counter.cnt
    
    template = loader.get_template('index.html')
    key = "Compress.exe"
    url = bucket.sign_url('GET', key, 600)
    context = {"href":url, "cnt":cnt}
    counter.cnt += 1
    counter.save()
    return HttpResponse(template.render(context, request))

def upload(request):
    template = loader.get_template("upload.html")
    context = {}
    return HttpResponse(template.render(context, request))


def upload_file(request):
    if request.method == "POST":
        myFile = request.FILES.get("myfile", None)
        if not myFile:
            return HttpResponse("no file to upload!")
        key = "Compress.exe"
        bucket.put_object(key, myFile)
        return HttpResponse("upload successfully!")


    



