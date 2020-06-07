const workercode = () => {
    self.onmessage = ({ data }) => {
        fetch(new URL(data.endpoint, data.base)).then(result => result.json())
            .then(list => this.postMessage({ list }))
            .catch(error => this.postMessage({ error }))
    }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const worker_script = URL.createObjectURL(blob);

module.exports = worker_script;
