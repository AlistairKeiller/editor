<script>
    import 'xterm/css/xterm.css';
    import { Terminal } from 'xterm';
    import { afterUpdate } from 'svelte';

    afterUpdate(() => {
        const terminal = new Terminal();
        terminal.open(document.getElementById('terminal'));
        terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
	});
</script>

<div id='terminal'></div>