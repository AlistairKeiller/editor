<script>
    // inspired by https://github.com/yjs/y-codemirror.next/blob/main/demo/codemirror.js
    import { Doc } from "yjs";
    import { yCollab, yUndoManagerKeymap } from "y-codemirror.next";
    import { WebrtcProvider } from "y-webrtc";

    import { EditorView, basicSetup } from "codemirror";
    import { EditorState } from '@codemirror/state';
    import { keymap } from '@codemirror/view';
    import { indentWithTab } from "@codemirror/commands"
    import { oneDark } from "@codemirror/theme-one-dark";

    import { afterUpdate } from "svelte";

    afterUpdate(() => {
        const ydoc = new Doc();
        const provider = new WebrtcProvider("codemirror6-alistair-demo-room", ydoc);
        const ytext = ydoc.getText("codemirror");

        const state = EditorState.create({
            doc: ytext.toString(),
            extensions: [
                keymap.of([
                    indentWithTab,
                    yUndoManagerKeymap,
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
        const view = new EditorView({
            state,
            parent: document.getElementById("codemirror")
        });
    });
</script>
    
<div id="codemirror"/>

<style>
    #codemirror {
      position: absolute;
      width: 50%;
      height: 100%;
    }
</style>