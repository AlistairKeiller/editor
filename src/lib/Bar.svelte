<script>
    let running = true;
    function handleClick() {
        running = !running;
    }
</script>

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