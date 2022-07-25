<script>
    import 'xterm/css/xterm.css';
    import { Terminal } from 'xterm';
    import { FitAddon } from 'xterm-addon-fit';
    import { afterUpdate } from 'svelte';

    afterUpdate(() => {
        const terminal = new Terminal();
        const fitAddon = new FitAddon();
        terminal.loadAddon(fitAddon);
        terminal.open(document.getElementById('terminal'));
        fitAddon.fit();
        terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
	});
</script>

<div id='terminal'></div>