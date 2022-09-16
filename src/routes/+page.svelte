<script>
    // xterm imports
    import 'xterm/css/xterm.css';
    import '$lib/Xterm.css';

    // yjs imports
    // import { Doc } from "yjs";
    // import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
    // import { WebrtcProvider } from "y-webrtc";

    // codemirror imports
    import { EditorView, basicSetup } from "codemirror";
    import { keymap } from '@codemirror/view';
    import { indentWithTab } from "@codemirror/commands"
    import { oneDark } from "@codemirror/theme-one-dark";
    import { EditorState } from '@codemirror/state';

    // svelte imports
    import { onMount } from 'svelte';

    // terminal preDOM setup
    let terminal;
    let xterm;
    let fitAddon;

    // codemirror preDOM setup
    let codemirror;
    let view;
    const state = EditorState.create({
        extensions: [
            keymap.of([
                indentWithTab,
            ]),
            basicSetup,
            EditorView.lineWrapping,
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
    
    // backend preDOM setup
    let worker;
    let buttonState = "loading";
    function readyClicked() {
        buttonState = "running";
        xterm.reset();
        worker.postMessage({ type: 'run', 'message': view.state.doc.toString() });
    }

    // DOM setup
    onMount(async () => {
        // codemirror DOM setup
        view = new EditorView({
            state,
            parent: codemirror
        });

        // xterm DOM setup
        const [{ Terminal }, { FitAddon }, { WebglAddon } ] = await Promise.all([import("xterm"), import("xterm-addon-fit"), import("xterm-addon-webgl")]);
        xterm = new Terminal({
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
            allowProposedApi: true,
        });
        xterm.open(terminal);
        fitAddon = new FitAddon();
        xterm.loadAddon(fitAddon);
        xterm.loadAddon(new WebglAddon());
        fitAddon.fit();
        xterm.writeln([
            '',
            '    Basicly All Native (BAN) is a C++ IDE that attempts to combine the',
            '    power of a full fledged a editor with the ease of use of the browser',
            '',
            ' ┌ \x1b[1mFeatures\x1b[0m ──────────────────────────────────────────────────────────────────┐',
            ' │                                                                            │',
            ' │  \x1b[31;1mCollaboration just works                \x1b[32mPerformance\x1b[0m                       │',
            ' │  Just use the share button               BAN uses codemirror 6, xterm.js   │',
            ' │                                          SvelteKit, yjs, and WebAssembly   │',
            ' │                                                                            │',
            ' │  \x1b[33;1mAccessible                              \x1b[34mEasy to use\x1b[0m                       │',
            ' │  Works on any modern browser             Anyone can use BSC                │',
            ' │                                                                            │',
            ' └────────────────────────────────────────────────────────────────────────────┘',
        ].join('\n\r'));

        worker = new Worker('/src/lib/worker.js', { type: 'module' });
        worker.onmessage = (e) => {
            switch(e.data.type) {
                case 'ready':
                    buttonState = "ready";
                    break;
                case 'stdout':
                    xterm.writeln(e.data.message);
                    break;
            }
        };
	});
</script>

<div class="grid h-screen grid-cols-2 grid-rows-[1fr_17fr] gap-1 bg-[#20232a]">
    <div class="col-span-full flex justify-center mt-1">
        {#if buttonState == "ready"}
            <button on:click={readyClicked} class="bg-green-800 text-green-300 hover:bg-green-600 hover:text-white font-bold w-32 rounded-xl transition-all outline-none drop-shadow-2xl">
                Run
            </button>
        {:else if buttonState == "running" }
            <button class="bg-red-800 text-red-300 hover:bg-red-600 hover:text-white font-bold w-32 rounded-xl transition-all outline-none drop-shadow-2xl">
                Stop
            </button>
        {:else if buttonState == "loading" }
            <button class="bg-gray-800 text-gray-300 hover:bg-gray-600 hover:text-white font-bold w-32 rounded-xl transition-all outline-none drop-shadow-2xl">
                Loading...
            </button>
        {/if}
    </div>
    <div bind:this={codemirror} class="bg-[#282c34]" />
    <div bind:this={terminal} class="bg-[#282c34] overflow-hidden" />
</div>

<svelte:window on:resize={() => fitAddon.fit()} />