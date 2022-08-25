<script>
    // import Codemirror from '../lib/Codemirror.svelte';
    // import Xterm from '../lib/Xterm.svelte';
    import Clang from '../bin/clang++.js';
    export const compile = async ( ) => {
        const clang = await Clang();
        clang.FS.writeFile( 'main.cpp', 
`#include <malloc.h>
int main() {
    return 0;
}` );
        // console.log(clang.FS.open('/'));
        clang.callMain([]);
        // clang.callMain([ '-cc1', 'main.cpp' ]);
        // clang.callMain([ '-cc1', '-isysroot', '/lib/clang/wasi', '-internal-isystem', '/lib/clang/wasi/include', '-internal-isystem', '/lib/clang/16.0.0/include', 'main.cpp' ]);
    };
</script>

<button on:click={compile}>Compile</button>

<style>
    :global(body) {
        margin: 0;
    }
</style>