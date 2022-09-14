<script>
    const worker = new Worker('/src/lib/worker.ts', { type: 'module' });
    worker.onmessage = (e) => {
        switch(e.data.type) {
            case 'ready':
                // ready up
                break;
            case 'stdout':
                console.log(e.data.message);
                break;
            default:
                console.log("error: Unkown data", e.data);
        }
        console.log(e.data);
    };
//         worker.postMessage(
// `#include <iostream>
// int main() {
//     std::cout << "Hello World! This is a test";
// }` );
    // };
</script>
