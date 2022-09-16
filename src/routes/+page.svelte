<script>
    import Codemirror from '$lib/Codemirror.svelte';
    import Xterm from '$lib/Xterm.svelte';

    // const worker = new Worker('/src/lib/worker.js', { type: 'module' });
    // worker.onmessage = (e) => {
    //     switch(e.data.type) {
    //         case 'ready':
    //             // ready up
    //             console.log("ready");
    //             break;
    //         case 'stdout':
    //             console.log(e.data.message);
    //             break;
    //         default:
    //             console.log("error: Unkown data", e.data);
    //     }
    // };
    let running = true;
    function handleClick() {
        running = !running;
    }
</script>

<div class="grid h-screen grid-cols-2 grid-rows-[1fr_17fr] gap-1 bg-[#20232a]">
    <div class="col-span-full flex justify-center mt-1">
        {#if running}
            <button on:click={handleClick} class="bg-green-800 text-green-300 hover:bg-green-600 hover:text-white font-bold w-32 rounded-xl transition-all outline-none drop-shadow-2xl">
                Run
            </button>
        {:else}
            <button on:click={handleClick} class="bg-red-800 text-red-300 hover:bg-red-600 hover:text-white font-bold w-32 rounded-xl transition-all outline-none drop-shadow-2xl">
                Stop
            </button>
        {/if}
    </div>
    <Codemirror />
    <Xterm />
</div>