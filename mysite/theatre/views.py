from django.shortcuts import get_object_or_404,render
from . import fonc1
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import ffmpy
#import speechbrain as sb
#from speechbrain.dataio.dataio import read_audio
#from IPython.display import Audio
#from speechbrain.pretrained import EncoderDecoderASR
import speech_recognition as sr
from .models import Record

# Create your views here.

from django.http import HttpResponse

@csrf_exempt
def index(request):
    x = fonc1.somme(3,4)
    return render(request, "index2.html")

@csrf_exempt
def compute(request):
    print(request.POST)
    text = request.POST.get("text")
    result  = text + " => Traité par python"
    return JsonResponse({"result": str(result)})
