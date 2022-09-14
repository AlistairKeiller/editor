import { Buffer } from 'buffer'
import { init, WASI } from '@wasmer/wasi';
import Clang from '$lib/bin/clang.js';
import LD from '$lib/bin/lld.js';

self.Buffer = Buffer;

const [clang, ld] = await Promise.all([Clang(), LD(), init()]);
const wasi = new WASI({});
postMessage({ type: 'ready' });

onmessage = async ( e ) => {
    clang.FS.writeFile( 'main.cpp', e.data );
    clang.callMain([ '-cc1', '-emit-obj', '-I', '/lib/clang/16.0.0/include/c++/v1', '-I', '/lib/clang/16.0.0/include', 'main.cpp' ]); // '-fcolor-diagnostics'
    ld.FS.writeFile('main.o', clang.FS.readFile('main.o'));
    ld.callMain([ '-flavor', 'wasm', '-L/wlib', '-lc', '-lc++', '-lc++abi', '/wlib/libclang_rt.builtins-wasm32.a', '/wlib/crt1.o', 'main.o', '-o', 'main.wasm' ]);
    
    const module = await WebAssembly.compile(ld.FS.readFile('main.wasm'));
    await wasi.instantiate(module);
    wasi.start();
    postMessage({ type: 'stdout', message: wasi.getStdoutString() });
}
