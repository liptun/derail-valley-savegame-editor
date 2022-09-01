/**
 * @author n1474335 [n1474335@gmail.com]
 * @copyright Crown Copyright 2016
 * @license Apache-2.0
 */

import forge from "node-forge";
import Utils from "../Utils.mjs";
import OperationError from "./OperationError";

/**
 * AES Decrypt operation
 */
class AESDecrypt {
    /**
     * AESDecrypt constructor
     */
    constructor() {
        this.args = [
            {
                name: "Key",
                type: "toggleString",
                value: "",
                toggleValues: ["Hex", "UTF8", "Latin1", "Base64"],
            },
            {
                name: "IV",
                type: "toggleString",
                value: "",
                toggleValues: ["Hex", "UTF8", "Latin1", "Base64"],
            },
            {
                name: "Mode",
                type: "argSelector",
                value: [
                    {
                        name: "CBC",
                        off: [5, 6],
                    },
                    {
                        name: "CFB",
                        off: [5, 6],
                    },
                    {
                        name: "OFB",
                        off: [5, 6],
                    },
                    {
                        name: "CTR",
                        off: [5, 6],
                    },
                    {
                        name: "GCM",
                        on: [5, 6],
                    },
                    {
                        name: "ECB",
                        off: [5, 6],
                    },
                    {
                        name: "CBC/NoPadding",
                        off: [5, 6],
                    },
                    {
                        name: "ECB/NoPadding",
                        off: [5, 6],
                    },
                ],
            },
            {
                name: "Input",
                type: "option",
                value: ["Hex", "Raw"],
            },
            {
                name: "Output",
                type: "option",
                value: ["Raw", "Hex"],
            },
            {
                name: "GCM Tag",
                type: "toggleString",
                value: "",
                toggleValues: ["Hex", "UTF8", "Latin1", "Base64"],
            },
            {
                name: "Additional Authenticated Data",
                type: "toggleString",
                value: "",
                toggleValues: ["Hex", "UTF8", "Latin1", "Base64"],
            },
        ];
    }

    /**
     * @param {string} input
     * @param {Object[]} args
     * @returns {string}
     *
     * @throws {OperationError} if cannot decrypt input or invalid key length
     */
    run(input, args) {
        const key = Utils.convertToByteString(args[0].string, args[0].option),
            iv = Utils.convertToByteString(args[1].string, args[1].option),
            mode = args[2].substring(0, 3),
            noPadding = args[2].endsWith("NoPadding"),
            inputType = args[3],
            outputType = args[4],
            gcmTag = Utils.convertToByteString(args[5].string, args[5].option),
            aad = Utils.convertToByteString(args[6].string, args[6].option);

        if ([16, 24, 32].indexOf(key.length) < 0) {
            throw new OperationError(`Invalid key length: ${key.length} bytes
The following algorithms will be used based on the size of the key:
  16 bytes = AES-128
  24 bytes = AES-192
  32 bytes = AES-256`);
        }

        input = Utils.convertToByteString(input, inputType);

        const decipher = forge.cipher.createDecipher("AES-" + mode, key);

        /* Allow for a "no padding" mode */
        if (noPadding) {
            decipher.mode.unpad = function (output, options) {
                return true;
            };
        }

        decipher.start({
            iv: iv.length === 0 ? "" : iv,
            tag: mode === "GCM" ? gcmTag : undefined,
            additionalData: mode === "GCM" ? aad : undefined,
        });
        decipher.update(forge.util.createBuffer(input));
        const result = decipher.finish();

        if (result) {
            return outputType === "Hex"
                ? decipher.output.toHex()
                : decipher.output.getBytes();
        } else {
            throw new OperationError(
                "Unable to decrypt input with these parameters."
            );
        }
    }
}

export default AESDecrypt;
