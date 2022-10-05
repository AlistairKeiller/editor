import { Buffer } from 'buffer'
// @ts-ignore
import { init, WASI } from '@wasmer/wasi';
// @ts-ignore
import Compile from '$lib/compile.js';

self.Buffer = Buffer;

const [compile] = await Promise.all([Compile(), init()]);
compile._init();
postMessage({ type: 'ready' });

onmessage = async (e) => {
    switch (e.data.type) {
        case 'run':
            compile.FS.writeFile('main.cpp', e.data.message);
            compile._compile();
            // console.log('compiled');
            // const wasi = new WASI({});
            // clang.FS.writeFile('main.cpp', e.data.message);
            // clang.callMain(['-cc1', '-emit-obj', '-I', '/lib/clang/16.0.0/include/c++/v1', '-I', '/lib/clang/16.0.0/include', 'main.cpp']); // '-fcolor-diagnostics'
            // ld.FS.writeFile('main.o', clang.FS.readFile('main.o'));
            // ld.callMain(['-flavor', 'wasm', '-L/wlib', '-lc', '-lc++', '-lc++abi', '/wlib/libclang_rt.builtins-wasm32.a', '/wlib/crt1.o', 'main.o', '-o', 'main.wasm']);

            // const module = await WebAssembly.compile(ld.FS.readFile('main.wasm'));
            // await wasi.instantiate(module);
            // wasi.start();
            // postMessage({ type: 'stdout', message: wasi.getStdoutString() });
            postMessage({ type: 'ready' });
            break;
    }
}
