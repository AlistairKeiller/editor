<script>
    // xterm imports
    import 'xterm/css/xterm.css';
    import '$lib/Xterm.css';
    // import { Terminal } from 'xterm';
    // import { FitAddon } from 'xterm-addon-fit';
    // import { WebglAddon } from 'xterm-addon-webgl';

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

    // codemirror preDOM setup
    let codemirror;
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
    

    // DOM setup
    onMount(async () => {
        // codemirror DOM setup
        const view = new EditorView({
            state,
            parent: codemirror
        });

        // xterm DOM setup
        const [{ Terminal }, { FitAddon }, { WebglAddon } ] = await Promise.all([import("xterm"), import("xterm-addon-fit"), import("xterm-addon-webgl")]);
        const xterm = new Terminal({
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
        const fitAddon = new FitAddon();
        xterm.loadAddon(fitAddon);
        xterm.loadAddon(new WebglAddon());
        fitAddon.fit();
        xterm.write([
    '',
    '    Basicly Client Side (BCS) is a java IDE that attempts to combine the',
    '    power of a full fledged a editor with the ease of use of the browser',
    '',
    ' ┌ \x1b[1mFeatures\x1b[0m ──────────────────────────────────────────────────────────────────┐',
    ' │                                                                            │',
    ' │  \x1b[31;1mCollaboration just works                \x1b[32mPerformance\x1b[0m                       │',
    ' │  have collaborators join                 xterm.js, codemirror 6, yjs, and  │',
    ' │  alicalik1.github.io/editorv3/text       doppioJVM maximize performance    │',
    ' │                                                                            │',
    ' │  \x1b[33;1mAccessible                              \x1b[34mEasy to learn\x1b[0m                     │',
    ' │  Works on any browser                    Anyone can quickly learn BSC      │',
    ' │                                                                            │',
    ' └────────────────────────────────────────────────────────────────────────────┘',
    '',
    '    Just a note: "loading..." means loading an entire JVM',
    '    and javascript JVM emulator which can take a while.',
  ].join('\n\r'));
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
    <div bind:this={codemirror} class="bg-[#282c34]" />
    <div bind:this={terminal} class="bg-[#282c34]" />
</div>