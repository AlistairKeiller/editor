<script>
    // import Codemirror from '../lib/Codemirror.svelte';
    // import Xterm from '../lib/Xterm.svelte';
    import Clang from '../bin/clang++.js';
    export const compile = async ( code ) => {
        const clang = await Clang();
        clang._main(["test", "test"]);
    };
</script>

<button on:click={compile}>Compile</button>

<!-- <Xterm/>
<Codemirror/> -->

<style>
    :global(body) {
        margin: 0;
    }
</style>