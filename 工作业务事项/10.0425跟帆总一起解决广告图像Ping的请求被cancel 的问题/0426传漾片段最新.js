// MARK: - Check The Impression Tracking
function sendImpToThirdParty(Imp, AdName, assID) {
    if (typeof Imp === 'string') {
        var asRandom = 'IMG' + Math.round(Math.random() * 1000000000000);
        var timestamp = new Date().getTime();
        var ImpNew = Imp;
        if (ImpNew.indexOf('?') < 0) {
            ImpNew += '?';
        }
        ImpNew = ImpNew.replace('ord=[timestamp]', 'ord=' + timestamp) + '&' + asRandom + '&ftctime=' + timestamp;
        if (typeof window.parent.gTrackThirdParyImpression !== 'object') {
            window.parent.gTrackThirdParyImpression = {};
        }
        window.parent.gTrackThirdParyImpression[asRandom] = new Image();
        window.parent.gTrackThirdParyImpression[asRandom].src = ImpNew;
        window.parent.gTrackThirdParyImpression[asRandom].title = AdName + ' (' + assID + ')';
        window.parent.gTrackThirdParyImpression[asRandom].alt = Imp;

        window.parent.gTrackThirdParyImpression[asRandom].onload = function() {
            window.parent.ga('send', 'event', this.title, 'Success', this.alt, {
                'nonInteraction': 1
            });
            delete window.parent.gTrackThirdParyImpression[asRandom];
        };

        window.parent.gTrackThirdParyImpression[asRandom].onerror = function() {
            window.parent.ga('send', 'event', this.title, 'Fail', this.alt, {
                'nonInteraction': 1
            });
            ImpNew = ImpNew.replace('http://','https://');//失败推测是因为请求是http导致的，换成https试试。
            asRandom2 = 'IMG' + Math.round(Math.random() * 1000000000000);
            window.parent.gTrackThirdParyImpression[asRandom2] = new Image();
            window.parent.gTrackThirdParyImpression[asRandom2].src = ImpNew;
            window.parent.gTrackThirdParyImpression[asRandom2].title = this.title;
            window.parent.gTrackThirdParyImpression[asRandom2].alt = this.alt;
            window.parent.gTrackThirdParyImpression[asRandom2].onload = function() {
                window.parent.ga('send', 'event', this.title, 'Success on Retry', this.alt, {
                    'nonInteraction': 1
                });
                delete window.parent.gTrackThirdParyImpression[asRandom2];
            }
            window.parent.gTrackThirdParyImpression[asRandom2].onerror = function() {
                window.parent.ga('send', 'event', this.title, 'Fail on Retry', this.alt, {
                    'nonInteraction': 1
                });
            }
            delete window.parent.gTrackThirdParyImpression[asRandom];
        };

        window.parent.ga('send', 'event', AdName + ' (' + assID + ')', 'Request', Imp, {
            'nonInteraction': 1
        });
    }
}

if (typeof window.parent.sendImpToThirdParty === 'function') {
    window.parent.sendImpToThirdParty(Imp, AdName, '[ASSID]');
} else {
    sendImpToThirdParty(Imp, AdName, '[ASSID]');
}