import forge from "node-forge";
import Utils from "./cyberchef/Utils";

interface Props {
    input: string;
    key: string;
    iv: string;
}
const AESDecrypt = ({ input, key, iv }: Props) => {
    return new Promise((resolve, reject) => {
        const decipher = forge.cipher.createDecipher(
            "AES-CBC",
            Utils.convertToByteString(key, "Base64")
        );

        decipher.start({
            iv: Utils.convertToByteString(iv, "UTF8"),
        });
        decipher.update(
            forge.util.createBuffer(Utils.convertToByteString(input, "RAW"))
        );
        const result = decipher.finish();

        if (result) {
            resolve(decipher.output.getBytes());
        } else {
            reject("Unable to decrypt input with these parameters.");
        }
    });
};

export default AESDecrypt;
