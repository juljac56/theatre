var audio = document.querySelector('audio');
  var constraints = { audio: true };

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    var mediaRecorder = new MediaRecorder(stream);
    var chunks = [];

    mediaRecorder.addEventListener('dataavailable', function (event) {
      chunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', function () {
      var blob = new Blob(chunks, { type: 'audio/wav' });
      var url = URL.createObjectURL(blob);
      audio.src = url;
      chunks = []; // reset

      var fd = new FormData();
      var filename = new Date().toISOString();
      fd.append("test","ok test")
      fd.append("file",blob, filename);
      var wavfromblob = new File([blob], "incomingaudioclip.wav");
      console.log(wavfromblob);
      let data = new FormData();
    data.append("recorded_audio", wavfromblob);


      console.log(fd.get("audio_data"))
      const request = new Request('{% url "compute" %}', {
        method: 'POST',
        body: data,
        //headers: {'X-CSRFToken': csrfTokenValue}
        
    });

    chunks = [];
    fetch(request)
        .then(response => response.json())
        .then(result => {
        })

    });
    
})


// Partie Python


result = request.FILES.get("file")
    re = request.POST.get("test")
    
    audio_file= request.FILES.get("recorded_audio")
    record = Record.objects.create(voice_record=audio_file)
    record.save()
    
    path = record.voice_record.path
    n_path = path.replace(".wav","1.wav")
    
    ff = ffmpy.FFmpeg(executable="C:\\Users\\julja\\Desktop\\informatique\\philou\\mysite\\ffmepg_folder\\bin\\ffmpeg.exe",
                  inputs={path: None}, outputs={n_path: None})
    ff.run()
    
    r = sr.Recognizer()
    with sr.AudioFile(n_path) as source:
    #reads the audio file. Here we use record instead of
    #listen
        audio = r.record(source)  
    
        text = r.recognize_google(audio, language='fr-FR')
    #result = int(a) + int(b)
        print(str(text))
    return JsonResponse({"operation_result": str(text)})



    // html

    <!-- index.html -->
<audio controls></audio>
