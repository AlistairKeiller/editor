<script>
    // import Codemirror from '../lib/Codemirror.svelte';
    // import Xterm from '../lib/Xterm.svelte';
    import Clang from '../bin/clang++.js';
    export const compile = async ( ) => {
        const clang = await Clang();
        clang.FS.writeFile( 'main.cpp', 
`#include <iostream>
int main() {
    return 0;
}` );
        // clang._main();
        // console.log(clang.FS.open('/'));
        // clang.callMain();
        // clang.callMain([ '-cc1', 'main.cpp' ]);
        // clang.callMain([ '-cc1', '-I', '/lib/clang/wasi/include', '-I', '/lib/clang/wasi/include/c++/v1', '-I', '/lib/clang/16.0.0/include', 'main.cpp' ]);
        clang.callMain([ '-cc1', '-emit-obj', '-disable-free', '-I', '/lib/clang/wasi/include', '-I', '/lib/clang/wasi/include/c++/v1', '-I', '/lib/clang/16.0.0/include', '-O2', '-o', 'test.o', '-x', 'c++', 'main.cpp' ]);
    };
</script>

<button on:click={compile}>Compile</button>

<style>
    :global(body) {
        margin: 0;
    }
</style>