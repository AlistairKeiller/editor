<script>
    // import Codemirror from '../lib/Codemirror.svelte';
    // import Xterm from '../lib/Xterm.svelte';
    import Clang from '../bin/clang++.js';
    import LD from '../bin/wasm-ld.js';

    export const compile = async ( ) => {
        const clang = await Clang();
        const ld = await LD();

        clang.FS.writeFile( 'main.cpp', 
`#include <iostream>
int main() {
    return 0;
}` );
        clang.callMain([ '-cc1', '-emit-obj', '-I', '/lib/clang/16.0.0/include/c++/v1', '-I', '/lib/clang/16.0.0/include', 'main.cpp' ]); // '-fcolor-diagnostics'
        ld.FS.writeFile('main.o', clang.FS.readFile('main.o'));
        ld.callMain([ '-flavor', 'wasm', '-L/wlib', '-lc', '-lc++', '-lc++abi', '/wlib/libclang_rt.builtins-wasm32.a', '/wlib/crt1.o', 'main.o', '-o', 'main.wasm' ]);
        // const module = await WebAssembly.compile(ld.FS.readFile('main.wasm'));
        // console.log(ld.FS.readFile('main.wasm').buffer);
        // const bytes = ld.FS.readFile('main.wasm');
        // console.log(bytes);

        const instance = await WebAssembly.instantiate(ld.FS.readFile('main.wasm'), {
            "wasi_snapshot_preview1": {
                proc_exit() {
                    console.log('proc_exit');
                },
            }
        });
        // instance.instance.exports._start();

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