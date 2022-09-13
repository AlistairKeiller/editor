<script>
    // import Codemirror from '$lib/Codemirror.svelte';
    // import Xterm from '$lib/Xterm.svelte';
    // import Clang from '$lib/bin/clang++.js';
    // import LD from '$lib/bin/wasm-ld.js';
    
    // create worker
    const worker = new Worker('/src/lib/worker.js', { type: 'module' });

    // let clang;
    // let ld;
    // onMount(async () => {
        // clang = await Clang();
        // ld = await LD();
    //     await init();
    // });

//     export const compile = async () => {
//         clang.FS.writeFile( 'main.cpp', 
// `#include <iostream>
// int main() {
//     return 0;
// }` );
//         clang.callMain([ '-cc1', '-emit-obj', '-I', '/lib/clang/16.0.0/include/c++/v1', '-I', '/lib/clang/16.0.0/include', 'main.cpp' ]); // '-fcolor-diagnostics'
//         ld.FS.writeFile('main.o', clang.FS.readFile('main.o'));
//         ld.callMain([ '-flavor', 'wasm', '-L/wlib', '-lc', '-lc++', '-lc++abi', '/wlib/libclang_rt.builtins-wasm32.a', '/wlib/crt1.o', 'main.o', '-o', 'main.wasm' ]);
//         console.log(ld.FS.readFile('main.wasm'))
// };
</script>

<!-- <button on:click={compile}>Compile</button> -->

<style>
    :global(body) {
        margin: 0;
    }
</style>