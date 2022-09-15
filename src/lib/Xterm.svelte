<script>
    import 'xterm/css/xterm.css';
    import '$lib/Xterm.css';
    import { Terminal } from 'xterm';
    import { FitAddon } from 'xterm-addon-fit';

    import { onMount } from 'svelte';

    onMount(() => {
        // theme from https://github.com/Binaryify/OneDark-Pro/blob/master/src/themes/data/oneDarkPro.ts
        const terminal = new Terminal({
            theme: {
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
        terminal.open(document.getElementById('terminal'));
        fitAddon.fit();
        terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
	});
</script>

<div id='terminal' />