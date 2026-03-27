/**
 * AdBlock detector
 *
 * abDetect().then((detected) => {
 *     if(detected) {
 *         console.log('AdBlock detected');
 *     }
 *     else {
 *         console.log('No AdBlock detected');
 *     }
 * });
 */

function abDetect() {
    return new Promise((resolve) => {

        if(window.self !== window.top) {
            resolve(false);
            return;
        }

        const testElementsClasses = [
            'adsbox',
            'ad',
            'banner_ad',
            'advertisement',
            'googleAd',
            'ads',
            'banner-ad',
            'google-ad'
        ];

        const testElementsIds = [
            'ad',
            'AdHeader',
            'AdContainer',
            'AD_Top',
            'homead',
            'ad-lead'
        ];

        let createdElements = [];
        let blockedCount = 0;

        for(let i in testElementsClasses) {
            let element = document.createElement('div');
            element.className = testElementsClasses[i];
            element.innerHTML = '&nbsp;';
            element.style.cssText = ''+
                'position: absolute;'+
                'top: -1000px;'+
                'left: -1000px;'+
                'width: 100px;'+
                'height: 100px;'+
                'display: block;'+
                'visibility: visible;'
            ;
            document.body.appendChild(element);
            createdElements.push(element);
        }

        for(let i in testElementsIds) {
            let element = document.createElement('div');
            element.id = testElementsIds[i];
            element.innerHTML = '&nbsp;';
            element.style.cssText = ''+
                'position: absolute;'+
                'top: -1000px;'+
                'left: -1000px;'+
                'width: 100px;'+
                'height: 100px;'+
                'display: block;'+
                'visibility: visible;'
            ;
            document.body.appendChild(element);
            createdElements.push(element);
        }

        setTimeout(() => {
            for(let i in createdElements) {
                const isHidden = createdElements[i].offsetHeight === 0 && createdElements[i].offsetWidth === 0;
                const isDisplayNone = window.getComputedStyle(createdElements[i]).display === 'none';
                const isVisibilityHidden = window.getComputedStyle(createdElements[i]).visibility === 'hidden';

                if(isHidden || isDisplayNone || isVisibilityHidden) {
                    blockedCount++;
                }

                if(createdElements[i].parentNode) {
                    createdElements[i].parentNode.removeChild(createdElements[i]);
                }
            }

            resolve(blockedCount > 0);
        },200);
    });
}
