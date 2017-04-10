var phonePortrait = 'http://creatives.ftchinese.com/ads/beijing/201703/8481472-0308.jpg';
var phoneLandscape = 'http://creatives.ftchinese.com/ads/beijing/201703/8481472-0308.jpg';
var padPortrait = 'http://creatives.ftchinese.com/ads/beijing/201703/8481472-0308.jpg';
var padLandscape = 'http://creatives.ftchinese.com/ads/beijing/201703/8481472-0308.jpg';
var imp = 'http://g.cn.miaozhen.com/x/k=2039761&p=75bd9&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&tr=__REQUESTID__&o=';
// MARK: - get window width and height
try {
    w = window.parent.innerWidth || window.parent.document.documentElement.clientWidth || window.parent.document.body.clientWidth;
    h = window.parent.innerHeight || window.parent.document.documentElement.clientHeight || window.parent.document.body.clientHeight;
} catch(ignore) {
    w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}
if (w > h) {
    var newW = w;
    w = h;
    h = newW;
}
phonePortrait = 'https://www.ft.com/__origami/service/image/v2/images/raw/'+  encodeURIComponent(phonePortrait) +'?source=ftchinese&width=' + 828;
phoneLandscape = 'https://www.ft.com/__origami/service/image/v2/images/raw/'+  encodeURIComponent(phoneLandscape) +'?source=ftchinese&width=' + 828;
var url = parent.window.location.href;
if (typeof(url) != 'undefined') {
    if (url.indexOf('/interactive/') > 0) {
        var images = {
            'phonePortrait': phonePortrait,
            'phoneLandscape': phoneLandscape,
            'padPortrait': padPortrait,
            'padLandscape': padLandscape
        };
        var link = 'http://dolphin.ftimg.net/c?z=ft&la=0&si=600&cg=2022&c=20220107&ci=262&or=3721&l=604956&bg=8610&b=29902&u=http://e.cn.miaozhen.com/r/k=2039761&p=75bd9&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&tr=__REQUESTID__&vo=3decb577f&vr=2&o=http%3A%2F%2Fwww.boc.cn';
        var bg = 'black';
        var w;
        var h;
        var imageSrc = '';
        var maxWidth = '100%';
        var maxHeight = '100%';
        var isRetinaDevice = (window.devicePixelRatio > 1);
        var imageWidth;
        var commonDeviceWidths = [1024, 768, 320, 360, 375, 414];
        imageWidth = w;
        if (w < 490) {
            imageSrc = images.phonePortrait;
        } else if (w < 700 && w > h) {
            imageSrc = images.phoneLandscape;
        } else if (w > h) {
            imageSrc = images.padLandscape;
        } else {
            imageSrc = images.padPortrait;
        }
        if (w > 1024) {
            maxWidth = '1024px';
            imageWidth = 1024;
        }
        if (w > 768) {
            maxHeight = '768px';
        }
        if (commonDeviceWidths.indexOf(imageWidth) < 0) {
            imageWidth = Math.ceil(imageWidth / 100) * 100;
        }
        if (isRetinaDevice === true) {
            imageWidth = imageWidth * 2;
        }
        imageSrc = encodeURIComponent(imageSrc);
        imageSrc = 'http://image.webservices.ft.com/v1/images/raw/' + imageSrc + '?source=ftchinese&width=' + imageWidth;
        imageSrc = '<a href="' + link + '" target="_blank"><img src="' + imageSrc + '" style="max-width:' + maxWidth + ';max-height:' + maxHeight + ';display:block;margin:auto;position:absolute;top:0;bottom:0;left:0;right:0;"></a>';
        imageImp = '<img src="' + imp + '" style="width:0px; height:0px; display:none;">';
        imageSrc = imageSrc + imageImp;
        try {
            var ele = window.parent.document.getElementById(parentId).parentNode;
            ele.style.backgroundColor = bg;
            ele.style.position = 'relative';
            ele.innerHTML = imageSrc;
        } catch(ignore) {
            document.body.style.backgroundColor = bg;
            document.body.style.position = 'relative';
            document.write(imageSrc);
        }
    } else { (function() {
            var adOpacity = '1';
            var adImage = phoneLandscape;
            var adImage2 = phonePortrait;
            var adimp = imp;
            // MARK: Landscape
            var adWidth = h;
            var adHeight = w;
            // MARK: Portrait
            var adWidth2 = w;
            var adHeight2 = h;
            var closeButtonPosition = '';
            var adClass1 = (adWidth < 700) ? 'mobile-landscape': 'wide-screen';
            var adClass2 = (adWidth < 700) ? 'mobile-portrait': 'narrow-screen';
            var adCode = '';
            adLink = 'http://dolphin.ftimg.net/c?z=ft&la=0&si=600&cg=2022&c=20220107&ci=262&or=3721&l=604956&bg=8610&b=29902&u=http://e.cn.miaozhen.com/r/k=2039761&p=75bd9&dx=__IPDX__&rt=2&ns=__IP__&ni=__IESID__&v=__LOC__&xa=__ADPLATFORM__&tr=__REQUESTID__&vo=3decb577f&vr=2&o=http%3A%2F%2Fwww.boc.cn';
            if (adLink.indexOf('?') > 0 && !adLink.indexOf('?http')) {
                adLink += '&isad=1';
            } else {
                adLink += '?isad=1';
            }
            adCode = '<div class=overlayBG style="opacity:' + adOpacity + '"></div><div class=inner><div class=cell><div class="' + adClass1 + '" style="width:' + adWidth + 'px;height:' + adHeight + 'px;margin:auto;position:relative;"><div class="o-overlay__close" style="top:0;right:0;"><div class="o-overlay__close-icon" onclick="closeOverlay()"></div></div><a href="' + adLink + '" target=_blank><div style="width:' + adWidth + 'px;height:' + adHeight + 'px;background-image: url(' + adImage + ');background-repeat: no-repeat;background-size:cover;"></div></a></div><div class="' + adClass2 + '" style="width:' + adWidth2 + 'px;height:' + adHeight2 + 'px;margin:auto;position:relative;"><div class="o-overlay__close" style="top:0;right:0;"><div class="o-overlay__close-icon" onclick="closeOverlay()"></div></div><a href="' + adLink + '" target=_blank><div style="width:' + adWidth2 + 'px;height:' + adHeight2 + 'px;background-image: url(' + adImage2 + ');background-repeat: no-repeat;background-size:cover;"></div></a></div></div>';
            var popAd = parent.parent.document.getElementById("pop-ad");
            var popAdClass = popAd.className;
            var img = new Image();
            img.src = adImage;
            if (popAdClass.indexOf('done') < 0) {
                img.onload = function() {
                    var img2 = new Image();
                    img2.src = adImage2;
                    img2.onload = function() {
                        popAd.innerHTML = adCode;
                        if (popAdClass.indexOf('in-page') < 0) {
                            popAd.className = 'overlay on done';
                            setTimeout(function() {
                                popAd.className = 'overlay done';
                                popAd.innerHTML = '';
                            },
                            5000);
                        } else {
                            popAd.className += ' on';
                        }
                    };
                };
            }
        } ());
        var track = new Image();
        track.onload = function() {
            window.parent.ga('send', 'event', 'iPhone web app launch ad', 'Sent', imp, {'nonInteraction':1});
        };     
        track.onerror = function() {
            window.parent.ga('send', 'event', 'iPhone web app launch ad', 'Fail', imp, {'nonInteraction':1});
            var track2 = new Image();
            track2.onload = function() {
                window.parent.ga('send', 'event','iPhone web app launch ad','SentAfterRetry', imp, {'nonInteraction':1});
            }
            track2.onerror = function() {
                window.parent.ga('send', 'event', 'iPhone web app launch ad', 'FailAfterRetry', imp, {'nonInteraction':1});
            }
            track2.src = imp;
        };
        track.src = imp;
    }
}
