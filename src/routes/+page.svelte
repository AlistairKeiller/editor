<script>
    import '$lib/global.css';
    import Codemirror from '$lib/Codemirror.svelte';
    import Xterm from '$lib/Xterm.svelte';

    const worker = new Worker('/src/lib/worker.js', { type: 'module' });
    worker.onmessage = (e) => {
        switch(e.data.type) {
            case 'ready':
                // ready up
                console.log("ready");
                break;
            case 'stdout':
                console.log(e.data.message);
                break;
            default:
                console.log("error: Unkown data", e.data);
        }
    };
</script>

<Codemirror />
<Xterm />