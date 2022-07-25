<script>
    import 'xterm/css/xterm.css';
    import { Terminal } from 'xterm';
    import { FitAddon } from 'xterm-addon-fit';

    import { afterUpdate } from 'svelte';

    afterUpdate(() => {
        const terminal = new Terminal({
            theme: {
                selection:     '#565656',
                background:    '#1e1e1e',
                foreground:    '#cccccc',
                black:         '#000000',
                red:           '#cd3131',
                green:         '#0dbc79',
                yellow:        '#e5e510',
                blue:          '#2472c8',
                magenta:       '#bc3fbc',
                cyan:          '#11a8cd',
                white:         '#e5e5e5',
                brightBlack:   '#666666',
                brightRed:     '#f14c4c',
                brightGreen:   '#23d18b',
                brightYellow:  '#f5f543',
                brightBlue:    '#3b8eea',
                brightMagenta: '#d670d6',
                brightCyan:    '#29b8db',
                brightWhite:   '#e5e5e5',
            },
        });
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.getElementById('terminal'));
        fitAddon.fit();
        terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
	});
</script>

<div id='terminal'></div>

<style>
    #terminal {
      position: absolute;
      width: 50%;
      height: 100%;
      padding-left: 50%;
    }
</style>