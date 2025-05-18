// src/RotaryCipher.js
const CODE = "zvruwasqblojxtpgcfimkndyeh";

export class RotaryCipher {
    constructor(blueChar, redChar) {
        // Store original input for display, normalized to lowercase
        this.blueCharInput = blueChar.toLowerCase();
        this.redCharInput = redChar.toLowerCase();

        if (this.blueCharInput.length !== 1 || this.blueCharInput < 'a' || this.blueCharInput > 'z' ||
            this.redCharInput.length !== 1 || this.redCharInput < 'a' || this.redCharInput > 'z') {
            throw new Error("Keys must be single lowercase letters (a-z).");
        }

        this.blue = this.blueCharInput.charCodeAt(0);
        this.red = this.redCharInput.charCodeAt(0);
        this.encodeMap = new Map();
        this.decodeMap = new Map();

        const aCharCode = 'a'.charCodeAt(0);
        const zCharCode = 'z'.charCodeAt(0);

        for (let i = 0; i < CODE.length; i++) {
            let inCharCode = aCharCode + i + (this.blue - aCharCode);
            if (inCharCode > zCharCode) {
                inCharCode -= 26;
            }
            const inChar = String.fromCharCode(inCharCode);

            let outCharCode = CODE.charCodeAt(i) + (this.red - aCharCode);
            if (outCharCode > zCharCode) {
                outCharCode -= 26;
            }
            const outChar = String.fromCharCode(outCharCode);

            this.encodeMap.set(inChar, outChar);
            this.decodeMap.set(outChar, inChar);
        }
    }

    _process(input, map) {
        const lowerInput = input.toLowerCase();
        let output = "";
        for (let i = 0; i < lowerInput.length; i++) {
            const char = lowerInput[i];
            if (map.has(char)) {
                output += map.get(char);
            } else {
                // Strictly match Go's behavior where non-mapped becomes space:
                output += ' ';
            }
        }
        return output.toUpperCase();
    }

    encode(input) {
        return this._process(input, this.encodeMap);
    }

    decode(input) {
        return this._process(input, this.decodeMap);
    }

    getPrintableKey(method) {
        let keyString = "";
        const aCharCode = 'a'.charCodeAt(0);
        if (method.toLowerCase() === "encode") {
            keyString += `Encode\nRed (${this.redCharInput}) - Blue (${this.blueCharInput})\n`;
            keyString += `${this.redCharInput.toUpperCase()} === ${this.blueCharInput.toUpperCase()}\n\n`;
            keyString += "Plain  -> Cipher\n";
            for (let i = 0; i < 26; i++) {
                const char = String.fromCharCode(aCharCode + i);
                keyString += `${char} --> ${this.encodeMap.get(char) || '?'}\n`;
            }
        } else if (method.toLowerCase() === "decode") {
            keyString += `Decode\nBlue (${this.blueCharInput}) - Red (${this.redCharInput})\n`;
            keyString += `${this.blueCharInput.toUpperCase()} === ${this.redCharInput.toUpperCase()}\n\n`;
            keyString += "Cipher -> Plain\n";
            const sortedCipherChars = Array.from(this.decodeMap.keys()).sort();
            for (const cipherChar of sortedCipherChars) {
                if (cipherChar >= 'a' && cipherChar <= 'z') { // Only show a-z mappings
                    keyString += `${cipherChar} --> ${this.decodeMap.get(cipherChar) || '?'}\n`;
                }
            }
        }
        return keyString;
    }
}
