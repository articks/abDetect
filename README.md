# abDetect

``<script src="/path/to/abdetect.js"></script>``

```
abDetect().then((isBlocked) => {
    if(isBlocked) {
        console.log('AdBlock detected');
    }
    else {
        console.log('No AdBlock detected');
    }
});
```
