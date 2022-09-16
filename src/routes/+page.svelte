<script>
    // xterm imports
    import 'xterm/css/xterm.css';
    import '$lib/Xterm.css';
    import { Terminal } from 'xterm';
    import { FitAddon } from 'xterm-addon-fit';

    // yjs imports
    import { Doc } from "yjs";
    import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
    import { WebrtcProvider } from "y-webrtc";

    // codemirror imports
    import { EditorView, basicSetup } from "codemirror";
    import { keymap } from '@codemirror/view';
    import { indentWithTab } from "@codemirror/commands"
    import { oneDark } from "@codemirror/theme-one-dark";
    import { EditorState } from '@codemirror/state';

    // svelte imports
    import { onMount } from 'svelte';

    // terminal preDOM setup
    const terminal = new Terminal({
            theme: { // theme from https://github.com/Binaryify/OneDark-Pro/blob/master/src/themes/data/oneDarkPro.ts
                black: '#3f4451',
                blue: '#4aa5f0',
                brightBlack: '#4f5666',
                brightBlue: '#4dc4ff',
                brightCyan: '#4cd1e0',
                brightGreen: '#a5e075',
                brightMagenta: '#de73ff',
                brightRed: '#ff616e',
                brightWhite: '#e6e6e6',
                BrightYellow: '#f0a45d',
                cyan: '#42b3c2',
                green: '#8cc265',
                magenta: '#c162de',
                red: '#e05561',
                white: '#d7dae0',
                yellow: '#d18f52',
                background: '#282c34',
                border: '#3e4452',
                foreground: '#abb2bf',
                selection: '#abb2bf30',
            },
        });
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    // codemirror preDOM setup
    const ydoc = new Doc();
    const provider = new WebrtcProvider("codemirror6-alistair-demo-room", ydoc);
    const ytext = ydoc.getText("codemirror");
    const state = EditorState.create({
        doc: ytext.toString(),
        extensions: [
            keymap.of([
                indentWithTab,
                ...yUndoManagerKeymap,
            ]),
            basicSetup,
            EditorView.lineWrapping,
            yCollab(ytext, provider.awareness),
            oneDark,
            EditorView.theme({
                '&': { height: '100%' },
                "&.cm-editor": {
                    "&.cm-focused": {
                        outline: 'none'
                    }
                },
                '.cm-scroller::-webkit-scrollbar': { width: '12px' },
                '.cm-scroller::-webkit-scrollbar-thumb': { backgroundColor: '#ffffff20' },
            }),
        ],
    });

    // DOM setup
    onMount(() => {
        // xterm DOM setup
        terminal.open(document.getElementById('terminal'));
        fitAddon.fit();
        terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');

        // codemirror DOM setup
        const view = new EditorView({
            state,
            parent: document.getElementById("codemirror")
        });
	});

    let running = true;
    function handleClick() {
        running = !running;
    }

    // const worker = new Worker('/src/lib/worker.js', { type: 'module' });
    // worker.onmessage = (e) => {
    //     switch(e.data.type) {
    //         case 'ready':
    //             // ready up
    //             console.log("ready");
    //             break;
    //         case 'stdout':
    //             console.log(e.data.message);
    //             break;
    //         default:
    //             console.log("error: Unkown data", e.data);
    //     }
    // };
</script>

<div class="grid h-screen grid-cols-2 grid-rows-[1fr_17fr] gap-1 bg-[#20232a]">
    <div class="col-span-full flex justify-center mt-1">
        {#if running}
            <button on:click={handleClick} class="bg-green-800 text-green-300 hover:bg-green-600 hover:text-white font-bold w-32 rounded-xl transition-all outline-none drop-shadow-2xl">
                Run
            </button>
        {:else}
            <button on:click={handleClick} class="bg-red-800 text-red-300 hover:bg-red-600 hover:text-white font-bold w-32 rounded-xl transition-all outline-none drop-shadow-2xl">
                Stop
            </button>
        {/if}
    </div>
    <div id="codemirror" />
    <div id='terminal' class="bg-[#282c34]"/>
</div>