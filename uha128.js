import { randomInt } from "./randomInt";
import { Database, ExtendedDatabase } from "./Database";
const algorithm = new Database("UHA4");
// or -> nst algorithm = new Map();

if (!algorithm.sizeAll) generate();

export function generate() {
    const texts =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?'`#$%&*+,-._/(){}<>=^~|@:;";
    const text = [...texts];
    for (const v of text) {
        let algorithmString = "";
        for (let i = 0; i < 4; i++) {
            const int = randomInt(1, text.length);
            algorithmString += text[int - 1];
        }
        algorithm.set(v, algorithmString);
    }
}

export function uha128(string) {
    for (let i = 0; i < 128; i++) {
        string = [...string];
        for (let v in string) {
            let STR = [...string[v]];
            for (let i in STR)
                STR[i] = algorithm.has(STR[i]) ? algorithm.get(STR[i]) : STR[i];
                string[v] = STR.join("");
        }
        string = string.join("");
        while (string.length >= 256) {
            string = [...string];
            for (let i in string) if (i % 2 === 1) string[i] = "";
            string = string.filter(v => v !== "").join("");
        }
    }
    let removes = 0;
    if (string.length > 128) {
        string = [...string];
        for (let i = 0; i < string.length - 128; i++) {
            removes += 2;
            string[removes] = "";
        }
        string = string.filter(v => v !== "").join("");
    }
    console.warn(string.length);
    return string;
}
