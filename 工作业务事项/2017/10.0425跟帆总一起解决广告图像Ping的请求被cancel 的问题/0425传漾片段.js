//当前代码是在iframe内的dom执行
if (typeof Imp === 'string') {
    if (Imp.indexOf('?') < 0) {
        Imp += '?';
    }
    asRandom = 'IMG' + Math.round(Math.random() * 1000000000000);
    var timestamp = new Date().getTime();
    var ImpNew = Imp.replace('ord=[timestamp]', 'ord=' + timestamp) + '&' + asRandom + '&ftctime=' + timestamp;
    if (typeof window.parent.gTrackThirdParyImpression !== 'object') {
        window.parent.gTrackThirdParyImpression = {};
    }
    window.parent.gTrackThirdParyImpression[asRandom] = new Image();
    window.parent.gTrackThirdParyImpression[asRandom].onload = function() {
       //MARK: 一旦该iframe被刷新，则该事件的监听也终止
        window.parent.ga('send', 'event', AdName + ' ([ASSID])', 'Success', Imp, {
            'nonInteraction': 1
        });
        delete window.parent.gTrackThirdParyImpression[asRandom];
    };
    window.parent.gTrackThirdParyImpression[asRandom].onerror = function() {
      //MARK: 一旦该iframe被刷新，则该事件的监听也终止
        window.parent.ga('send', 'event', AdName + ' ([ASSID])', 'Fail', Imp, {
            'nonInteraction': 1
        });
        delete window.parent.gTrackThirdParyImpression[asRandom];
        asRandom2 = 'IMG' + Math.round(Math.random() * 1000000000000);
        window.parent.gTrackThirdParyImpression[asRandom2] = new Image();
        window.parent.gTrackThirdParyImpression[asRandom2].onload = function() {
            window.parent.ga('send', 'event', AdName + ' ([ASSID])', 'Success on Retry', Imp, {
                'nonInteraction': 1
            });
            delete window.parent.gTrackThirdParyImpression[asRandom2];
        }
        window.parent.gTrackThirdParyImpression[asRandom2].onerror = function() {
            window.parent.ga('send', 'event', AdName + ' ([ASSID])', 'Fail on Retry', Imp, {
                'nonInteraction': 1
            });
            delete window.parent.gTrackThirdParyImpression[asRandom2];
        }
        window.parent.gTrackThirdParyImpression[asRandom2].src = ImpNew;
    };
    //window.parent.gTrackThirdParyImpression[asRandom] = track;
    window.parent.gTrackThirdParyImpression[asRandom].src = ImpNew;
    window.parent.ga('send', 'event', AdName + ' ([ASSID])', 'Request', Imp, {
        'nonInteraction': 1
    });
}
/** 发送的ga为:
 * 请求发出时记录一次：ga('send', 'event', 'testOliver ([ASSID])', 'Request', Imp)
 * 请求的onload成功时记录一次：.ga('send', 'event', AdName + ' ([ASSID])', 'Success', Imp)

*/