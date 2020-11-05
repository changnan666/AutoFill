let editor = null;

window.onresize = function () {
  if (editor) {
    editor.layout();
  }
};

editor = monaco.editor.create(document.getElementById("editor"));

editor.onDidChangeModelContent(() => {
  const autofill = editor.getValue();

  chrome.storage.sync.set({
    autofill,
  });
});

chrome.storage.sync.get("autofill", ({ autofill }) => {
  const newModel = monaco.editor.createModel(autofill || "", "yaml");
  editor.setModel(newModel);
});
