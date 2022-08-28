<script>
    // import Codemirror from '../lib/Codemirror.svelte';
    // import Xterm from '../lib/Xterm.svelte';
    import Clang from '../bin/clang++.js';
    import LD from '../bin/lld.js';

    export const compile = async ( ) => {
        const clang = await Clang();
        const ld = await LD();
        clang.FS.writeFile( 'main.cpp', 
`#include <iostream>
int main() {
    return 0;
}` );
        clang.callMain([ '-cc1', '-emit-obj', '-I', '/lib/clang/wasi/include', '-I', '/lib/clang/wasi/include/c++/v1', '-I', '/lib/clang/16.0.0/include', 'main.cpp' ]);
        ld.FS.writeFile('main.o', clang.FS.readFile('main.o'));
        ld.callMain([ '-flavor', 'wasm', '-o', 'main.wasm', 'main.o' ]);
        console.log(ld.FS.open('/'));
        // console.log(clang.FS.open('/'));
};
</script>

<button on:click={compile}>Compile</button>

<style>
    :global(body) {
        margin: 0;
    }
</style>