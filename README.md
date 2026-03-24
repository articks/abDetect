# abDetect

<script src="/path/to/abdetect.js"></script>

detectAdBlock().then((isBlocked) => {
    if(isBlocked) {
        console.log('AdBlock detected');
    }
    else {
        console.log('No AdBlock detected');
    }
});
