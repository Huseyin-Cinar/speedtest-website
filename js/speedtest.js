window.onload = function() {thisFunction()}

function thisFunction() {
document.getElementById('progress').style.marginTop = ((window.innerHeight / 2) / 2) + 'px'    
}

var imageAddr = "https://i.ibb.co/RgrRwjx/sibersozluk-5mb-speedtest.jpg"; 
var downloadSize = 4995374;

function ShowProgressMessage(msg) {
    if (console) {
        if (typeof msg == "string") {
            console.log(msg);
        } else {
            for (var i = 0; i < msg.length; i++) {
                console.log(msg[i]);
            }
        }
    }
    
    var oProgress = document.getElementById("progress");
    if (oProgress) {
        var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
        oProgress.innerHTML = actualHTML;
    }
}

function InitiateSpeedDetection() {
    ShowProgressMessage("<br><div class='loader'></div><br><h2>Hızınız ölçülüyor...</h2>");
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
    var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    
    download.onerror = function (err, msg) {
        ShowProgressMessage(`<br><br><br><h1>Bir şeyler ters gitti</h1><br><button class='rety-button' onclick='window.location.reload(false)'>Tekrar dene</button>`);
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = imageAddr + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        var speedBpsn = (bitsLoaded / duration).toFixed(4);
        var speedKbpsn = (speedBps / 1024).toFixed(4);
        var speedMbpsn = (speedKbps / 1024).toFixed(4);
        localStorage.setItem("bps", speedBpsn)
        localStorage.setItem("kbps", speedKbpsn)
        localStorage.setItem("mbps", speedMbpsn)
        ShowProgressMessage([ 
            `<br><div class='data'><br><br><h1>${speedMbps} Mbps</h1></div><br><br><a style="color:#1f39e7;" href="#" onclick="more()">Daha fazla</a>`
        ]);
    }
}

function more() {
var bps = localStorage.getItem("bps")
var kbps = localStorage.getItem("kbps")
var mbps = localStorage.getItem("mbps")

document.getElementById('stats').style.display = 'block'
document.getElementById('ilk-h2').innerHTML = `İnternet Hızı (bps): `
document.getElementById('iki-h2').innerHTML = `İnternet Hızı (Kbps): `
document.getElementById('son-h2').innerHTML = `İnternet Hızı (Mbps): `    
document.getElementById('ilk-h2').innerHTML += `${bps} Bps`
document.getElementById('iki-h2').innerHTML += `${kbps} Kbps`
document.getElementById('son-h2').innerHTML += `${mbps} Mbps`
}