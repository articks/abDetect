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

        const testElements = [
            'adsbox',
            'ad',
            'banner_ad',
            'advertisement',
            'googleAd'
        ];

        const createdElements = [];
        let blockedCount = 0;

        for(let i in testElements) {
            const element = document.createElement('div');
            element.className = testElements[i];
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

        const elementWithId = document.createElement('div');
        elementWithId.id = 'ad';
        elementWithId.innerHTML = '&nbsp;';
        elementWithId.style.cssText = ''+
            'position: absolute;'+
            'top: -1000px;'+
            'left: -1000px;'+
            'width: 100px;'+
            'height: 100px;'
        ;
        document.body.appendChild(elementWithId);
        createdElements.push(elementWithId);

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
