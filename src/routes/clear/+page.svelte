<script>
    import redis from "$lib/redis.js"
    // for current database
    redis.flushdb(function(err, succeeded){
        console.log(succeeded); // will be true if success
    });

    // or for all databases
    redis.flushall(function(err, succeeded){
        console.log(succeeded); // will be true if success
    });    
</script>