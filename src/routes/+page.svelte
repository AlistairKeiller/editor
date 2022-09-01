<script>
    // import Codemirror from '../lib/Codemirror.svelte';
    // import Xterm from '../lib/Xterm.svelte';
    import Clang from '../bin/clang++.js';
    import LD from '../bin/wasm-ld.js';
    import { init, WASI } from '@wasmer/wasi';
    // import { WasmFs } from '@wasmer/wasmfs'
    // import browserBindings from '@wasmer/wasi/lib/bindings/browser'

    export const compile = async ( ) => {
        const clang = await Clang();
        const ld = await LD();

        // const wasmFs = new WasmFs();
        await init();
        // const wasi = new WASI();

//         clang.FS.writeFile( 'main.cpp', 
// `#include <iostream>
// int main() {
//     return 0;
// }` );
//         clang.callMain([ '-cc1', '-emit-obj', '-I', '/lib/clang/16.0.0/include/c++/v1', '-I', '/lib/clang/16.0.0/include', 'main.cpp' ]); // '-fcolor-diagnostics'
//         ld.FS.writeFile('main.o', clang.FS.readFile('main.o'));
//         ld.callMain([ '-flavor', 'wasm', '-L/wlib', '-lc', '-lc++', '-lc++abi', '/wlib/libclang_rt.builtins-wasm32.a', '/wlib/crt1.o', 'main.o', '-o', 'main.wasm' ]);
        // const module = await WebAssembly.compile(ld.FS.readFile('main.wasm'));
        // const instance = await WebAssembly.instantiate(module, {
        //     ...wasi.getImports(module)
        // });
        // wasi.start(instance);
        // const stdout = await wasmFs.getStdOut();
        // console.log(stdout);


        // console.log(wasm);
        // console.log(ld.FS.open('/'));
        // console.log(clang.FS.open('/'));
};
</script>

<button on:click={compile}>Compile</button>

<style>
    :global(body) {
        margin: 0;
    }
</style>